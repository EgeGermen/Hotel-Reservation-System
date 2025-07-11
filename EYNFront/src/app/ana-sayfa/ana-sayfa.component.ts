import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OtelService } from '../services/otel.services';
import { Otel } from '../models/otel.model';
import { OtelResimService } from '../services/otel-resim.services';
import { OtelResim } from '../models/otel-resim.model';
import { OdaTipiService } from '../services/oda-tipi.services';
import { OdaTipi } from '../models/oda-tipi.model';

@Component({
  selector: 'app-ana-sayfa',
  templateUrl: './ana-sayfa.component.html',
  styleUrl: './ana-sayfa.component.scss'
})
export class AnaSayfaComponent {
  searchForm: FormGroup;
  populerOteller: Otel[] = [];
  tumOteller: Otel[] = [];
  otelResimler: { [otelId: number]: OtelResim[] } = {};
  odaTipleri: any;
  minOdaFiyatlari: { [otelId: number]: number | null } = {};

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private otelService: OtelService,
    private otelResimService: OtelResimService,
    private odaTipiService: OdaTipiService
  ) {
    this.searchForm = this.fb.group({
      sehir: [''],
      otelAdi: [''],
      girisTarihi: [''],
      cikisTarihi: [''],
      kisiSayisi: ['']
    });
  }

  ngOnInit(): void {
    this.otelService.getAll().subscribe(oteller => {
      this.tumOteller = oteller;
      this.populerOteller = [...oteller]
        .sort((a, b) => (b.puan ?? 0) - (a.puan ?? 0))
        .slice(0, 4);
      // Otel resimlerini çek
      oteller.forEach(otel => {
        this.otelResimService.getByOtelId(otel.id).subscribe(resimler => {
          this.otelResimler[otel.id] = resimler;
        });
        // Oda tiplerini çekip minimum fiyatı bul
        this.odaTipiService.getByOtel(otel.id).subscribe(odaTipleri => {
          if (odaTipleri && odaTipleri.length > 0) {
            const minFiyat = Math.min(...odaTipleri.map(o => o.fiyat));
            this.minOdaFiyatlari[otel.id] = minFiyat;
          } else {
            this.minOdaFiyatlari[otel.id] = null;
          }
        });
      });
    });
  }

  getOtelImage(otel: Otel): string {
    // Eğer otelin resmi varsa ilkini göster, yoksa placeholder
    const resimler = this.otelResimler[otel.id];
    if (resimler && resimler.length > 0) {
      return resimler[0].resimUrl;
    }
    return `https://via.placeholder.com/300x200/007bff/ffffff?text=${encodeURIComponent(otel.otelAdi)}`;
  }

  onSearchSubmit(): void {
    const searchParams = this.searchForm.value;
    
    // Boş değerleri filtrele
    const filteredParams: any = {};
    Object.keys(searchParams).forEach(key => {
      if (searchParams[key] && searchParams[key].trim() !== '') {
        filteredParams[key] = searchParams[key];
      }
    });
    
    // Otel listesi sayfasına yönlendir ve arama parametrelerini query string olarak gönder
    this.router.navigate(['/otel-liste'], {
      queryParams: filteredParams
    });
  }

  // Tarih validasyonu
  validateDates(): void {
    const girisTarihi = this.searchForm.get('girisTarihi')?.value;
    const cikisTarihi = this.searchForm.get('cikisTarihi')?.value;

    if (girisTarihi && cikisTarihi) {
      const giris = new Date(girisTarihi);
      const cikis = new Date(cikisTarihi);

      if (cikis <= giris) {
        this.searchForm.get('cikisTarihi')?.setErrors({ invalidDate: true });
      } else {
        this.searchForm.get('cikisTarihi')?.setErrors(null);
      }
    }
  }

  // Minimum giriş tarihi (bugünden önceki tarihleri engelle)
  getMinDate(): string {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }

  // Minimum çıkış tarihi (giriş tarihinden sonraki günler)
  getMinCheckoutDate(): string {
    const girisTarihi = this.searchForm.get('girisTarihi')?.value;
    if (girisTarihi) {
      const giris = new Date(girisTarihi);
      giris.setDate(giris.getDate() + 1);
      return giris.toISOString().split('T')[0];
    }
    return this.getMinDate();
  }

  // Yorumlardan ortalama puan, yoksa girilen puan
  hesaplananPuan(otel: Otel): number {
    const anahtar = `yorumlar_${String(otel.id)}`;
    const yorumlarStr = localStorage.getItem(anahtar);
    if (yorumlarStr) {
      try {
        const yorumlar = JSON.parse(yorumlarStr);
        if (Array.isArray(yorumlar) && yorumlar.length > 0) {
          const toplam = yorumlar.reduce((acc: number, y: any) => acc + (y.yildiz || 0), 0);
          return +(toplam / yorumlar.length).toFixed(1);
        }
      } catch {}
    }
    return otel.puan || 0;
  }
}
