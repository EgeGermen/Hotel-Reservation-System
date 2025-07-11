import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OtelService } from '../services/otel.services';
import { OdaTipiService } from '../services/oda-tipi.services';
import { Otel } from '../models/otel.model';
import { OdaTipi } from '../models/oda-tipi.model';
import { OtelResimService } from '../services/otel-resim.services';
import { OdaTipiResimService } from '../services/oda-tipi-resim.services';
import { OtelResim } from '../models/otel-resim.model';
import { OdaTipiResim } from '../models/oda-tipi-resim.model';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-otel-detay',
  templateUrl: './otel-detay.component.html',
  styleUrl: './otel-detay.component.scss'
})
export class OtelDetayComponent implements OnInit {
  otel: Otel | null = null;
  odaTipleri: OdaTipi[] = [];
  loading = true;
  otelResimler: OtelResim[] = [];
  odaTipiResimler: { [odaTipiId: number]: OdaTipiResim[] } = {};
  seciliResimUrl: string | null = null;
  galeriAcik = false;
  galeriIndex = 0;
  // Eski:
  // odaGaleriAcik: { [odaTipiId: number]: boolean } = {};
  // odaGaleriIndex: { [odaTipiId: number]: number } = {};
  // Yeni:
  acikOdaGaleriId: number | null = null;
  acikOdaGaleriIndex: number = 0;
  sliderInterval: any;
  // YORUM: Yorumlarla ilgili değişkenler
  otelId: number = 0;
  yeniYorum: string = '';
  aktifEmail: string = 'Bilinmeyen Kullanıcı';
  seciliYildiz: number = 0;
  gonderildi: boolean = false;
  yorumlarModaliAcik: boolean = false;
  kullaniciId!: number;
  adminMi: boolean = false;
  yorumlar: {
    tarih: any;
    kullanici: string;
    metin: string;
    yildiz: number;
  }[] = [];

  constructor(
    private route: ActivatedRoute,
    private otelService: OtelService,
    private odaTipiService: OdaTipiService,
    private otelResimService: OtelResimService,
    private odaTipiResimService: OdaTipiResimService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.otelService.getById(id).subscribe(otel => {
        this.otel = otel;
        this.loading = false;
        // Otel resimlerini çek
        this.otelResimService.getByOtelId(id).subscribe(resimler => {
          this.otelResimler = resimler;
          if (resimler && resimler.length > 0) {
            this.seciliResimUrl = resimler[0].resimUrl;
            this.startSlider();
          }
        });
      });
      this.odaTipiService.getByOtel(id).subscribe(odaTipleri => {
        this.odaTipleri = odaTipleri;
        // Her oda tipi için resimleri çek
        odaTipleri.forEach(oda => {
          this.odaTipiResimService.getByOdaTipiId(oda.id).subscribe(resimler => {
            this.odaTipiResimler[oda.id] = resimler;
          });
        });
      });
    }

    // YORUM: Kullanıcı ve admin bilgisi alınıyor
    const user = this.authService.getCurrentUser();
    if (user?.username) {
      this.aktifEmail = user.username;
    }

    const userId: string | null = localStorage.getItem('userId');
    const adminData: string | null = localStorage.getItem('currentAdmin');

    if (userId) {
      this.kullaniciId = Number(userId);
    }

    if (adminData) {
      this.adminMi = true;
    }

    this.yorumlariYukle();
  

  }

  startSlider() {
    this.clearSlider();
    this.sliderInterval = setInterval(() => {
      if (this.otelResimler.length > 0) {
        const currentIdx = this.otelResimler.findIndex(r => r.resimUrl === this.seciliResimUrl);
        const nextIdx = (currentIdx + 1) % this.otelResimler.length;
        this.seciliResimUrl = this.otelResimler[nextIdx].resimUrl;
      }
    }, 3000);
  }

  clearSlider() {
    if (this.sliderInterval) {
      clearInterval(this.sliderInterval);
      this.sliderInterval = null;
    }
  }

  onResimSec(url: string) {
    this.seciliResimUrl = url;
    this.startSlider();
  }

  oncekiResim() {
    if (this.otelResimler.length > 0) {
      const currentIdx = this.otelResimler.findIndex(r => r.resimUrl === this.seciliResimUrl);
      const prevIdx = (currentIdx - 1 + this.otelResimler.length) % this.otelResimler.length;
      this.seciliResimUrl = this.otelResimler[prevIdx].resimUrl;
      this.startSlider();
    }
  }

  sonrakiResim() {
    if (this.otelResimler.length > 0) {
      const currentIdx = this.otelResimler.findIndex(r => r.resimUrl === this.seciliResimUrl);
      const nextIdx = (currentIdx + 1) % this.otelResimler.length;
      this.seciliResimUrl = this.otelResimler[nextIdx].resimUrl;
      this.startSlider();
    }
  }

  getOtelImage(otel: Otel): string {
    if (this.otelResimler && this.otelResimler.length > 0) {
      return this.otelResimler[0].resimUrl;
    }
    return `https://via.placeholder.com/800x400/007bff/ffffff?text=${encodeURIComponent(otel.otelAdi)}`;
  }
  getOdaTipiImage(oda: OdaTipi): string {
    const resimler = this.odaTipiResimler[oda.id];
    if (resimler && resimler.length > 0) {
      return resimler[0].resimUrl;
    }
    return `https://via.placeholder.com/400x200/007bff/ffffff?text=${encodeURIComponent(oda.odaTipiAdi)}`;
  }

  get otelResimUrls(): string[] {
    return this.otelResimler.map(r => r.resimUrl);
  }

  getOdaTipiResimUrls(odaTipiId: number): string[] {
    return (this.odaTipiResimler[odaTipiId] || []).map(r => r.resimUrl);
  }

  galeriAc(index: number) {
    this.galeriIndex = index;
    this.galeriAcik = true;
  }

  odaGaleriAc(odaTipiId: number, index: number) {
    this.acikOdaGaleriId = odaTipiId;
    this.acikOdaGaleriIndex = index;
  }

  onRezervasyonYap(): void {
    const user = this.authService.getCurrentUser();
    if (!user && this.otel) {
      this.router.navigate(['/kullanici-giris/login']);
      return;
    }
    if (this.otel) {
      this.router.navigate(['/rezervasyon/oda', this.otel.id]);
    }
  }

  ngOnDestroy() {
    this.clearSlider();
  }


// YORUM: Yıldız seçimi
  yildizSec(yildiz: number): void {
    this.seciliYildiz = yildiz;
  }

  // YORUM: Yorum gönderme
  yorumGonder(): void {
    if (!this.yeniYorum.trim()) return;

    const tarih = new Date().toLocaleDateString('tr-TR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });

    const yeniYorumObjesi = {
      kullanici: this.aktifEmail,
      metin: this.yeniYorum.trim(),
      yildiz: this.seciliYildiz,
      tarih: tarih
    };

    this.yorumlar.push(yeniYorumObjesi);
    this.yorumlariKaydet();
    this.yeniYorum = '';
    this.seciliYildiz = 0;
    this.gonderildi = true;

    setTimeout(() => (this.gonderildi = false), 3000);
  }

  // YORUM: Yorumları getir
  yorumlariYukle(): void {
    const veriler = localStorage.getItem(`yorumlar_${this.otelId}`);
    if (veriler) {
      this.yorumlar = JSON.parse(veriler);
    }
  }

  // YORUM: Yorumları kaydet
  yorumlariKaydet(): void {
    localStorage.setItem(`yorumlar_${this.otelId}`, JSON.stringify(this.yorumlar));
  }

  // YORUM: Tüm yorumları göster
  tumYorumlariGoster() {
    this.yorumlarModaliAcik = true;
  }

  // YORUM: Yorumu sil
  yorumSil(yorum: { kullanici: string; metin: string; yildiz: number }) {
    const aktifKullanici = this.aktifEmail.toLowerCase().trim();
    const yorumYazari = yorum.kullanici?.toLowerCase().trim();

    // Kendi yorumuysa veya adminse silebilir
    if (aktifKullanici === yorumYazari || this.adminMi) {
      this.yorumlar = this.yorumlar.filter(y => y !== yorum);
      this.yorumlariKaydet();
    } else {
      alert("Sadece kendi yorumunuzu silebilirsiniz.");
    }
  }

  // YORUM: Aktif kullanıcı kontrolü (silme butonu gösterimi için)
  kullaniciAktifMi(yorumKullanici: string): boolean {
    return yorumKullanici?.toLowerCase() === this.aktifEmail || this.adminMi;
  }

  // YORUM: Dinamik puan hesaplama
  get hesaplananPuan(): number {
    if (this.yorumlar && this.yorumlar.length > 0) {
      const toplam = this.yorumlar.reduce((acc, y) => acc + (y.yildiz || 0), 0);
      return +(toplam / this.yorumlar.length).toFixed(1);
    } else if (this.seciliYildiz > 0) {
      return this.seciliYildiz;
    } else {
      return 0;
    }
  }


}
