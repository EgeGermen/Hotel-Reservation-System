import { Component, OnInit } from '@angular/core';
import { RezervasyonService } from '../services/rezervasyon.services';
import { Router, ActivatedRoute } from '@angular/router';
import { OdaTipiService } from '../services/oda-tipi.services';
import { OdaTipi } from '../models/oda-tipi.model';
import { OdaTipiResimService } from '../services/oda-tipi-resim.services';
import { OdaTipiResim } from '../models/oda-tipi-resim.model';

@Component({
  selector: 'app-rezervasyon-oda',
  templateUrl: './rezervasyon-oda.component.html',
  styleUrl: './rezervasyon-oda.component.scss'
})
export class RezervasyonOdaComponent implements OnInit {
  odalar: OdaTipi[] = [];
  odaTipiResimler: { [odaTipiId: number]: OdaTipiResim[] } = {};
  seciliOdaId: number|null = null;
  kisiSayisi: number|null = null;
  girisTarihi: string = '';
  cikisTarihi: string = '';
  hataMesaji: string = '';
  loading: boolean = false;
  otelId: number|null = null;
  cocukSayisi: number = 0;
  cocukYaslari: ("0-6"|"7-12"|null)[] = [];
  getCocukIndexes(): number[] {
    return Array.from({length: this.cocukSayisi}, (_, i) => i);
  }

  constructor(
    private rezervasyonService: RezervasyonService,
    private odaTipiService: OdaTipiService,
    private odaTipiResimService: OdaTipiResimService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.otelId = Number(this.route.snapshot.paramMap.get('otelId'));
    if (this.otelId) {
      this.odaTipiService.getByOtel(this.otelId).subscribe(odalar => {
        this.odalar = odalar;
        // Her oda tipi için resimleri çek
        odalar.forEach(oda => {
          this.odaTipiResimService.getByOdaTipiId(oda.id).subscribe(resimler => {
            this.odaTipiResimler[oda.id] = resimler;
          });
        });
      });
    }
    this.cocukYaslari = [];
  }

  odaSec(odaId: number) {
    this.seciliOdaId = odaId;
    this.hataMesaji = '';
  }

  getOdaImage(oda: OdaTipi): string {
    const resimler = this.odaTipiResimler[oda.id];
    if (resimler && resimler.length > 0) {
      return resimler[0].resimUrl;
    }
    return `https://via.placeholder.com/400x200/007bff/ffffff?text=${encodeURIComponent(oda.odaTipiAdi)}`;
  }

  ileriDisabled(): boolean {
    return !this.seciliOdaId || !this.kisiSayisi || !this.girisTarihi || !this.cikisTarihi || this.loading;
  }

  ileri() {
    this.hataMesaji = '';
    if (!this.seciliOdaId || !this.girisTarihi || !this.cikisTarihi) return;
    this.loading = true;
    this.rezervasyonService.checkAvailability(
      this.seciliOdaId,
      new Date(this.girisTarihi),
      new Date(this.cikisTarihi)
    ).subscribe({
      next: (uygun) => {
        this.loading = false;
        if (uygun) {
          const seciliOda = this.odalar.find(o => o.id === this.seciliOdaId);
          this.router.navigate(['/rezervasyon/bilgi'], {
            state: {
              oda: seciliOda,
              kisiSayisi: this.kisiSayisi,
              girisTarihi: this.girisTarihi,
              cikisTarihi: this.cikisTarihi,
              cocukSayisi: this.cocukSayisi,
              cocukYaslari: this.cocukYaslari
            }
          });
        } else {
          this.hataMesaji = 'Bu tarihlerde oda rezerve edilmiş.';
        }
      },
      error: () => {
        this.loading = false;
        this.hataMesaji = 'Bir hata oluştu, lütfen tekrar deneyin.';
      }
    });
  }

  // cocukSayisi değişince yaş arrayini güncelle
  onCocukSayisiChange() {
    if (this.cocukYaslari.length > this.cocukSayisi) {
      this.cocukYaslari = this.cocukYaslari.slice(0, this.cocukSayisi);
    } else {
      while (this.cocukYaslari.length < this.cocukSayisi) {
        this.cocukYaslari.push(null);
      }
    }
  }
}
