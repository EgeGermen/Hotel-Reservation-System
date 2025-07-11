import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Rezervasyon } from '../models/rezervasyon.model';
import { RezervasyonService } from '../services/rezervasyon.services';
import { RezervasyonDurumu } from '../models/enums.model';

@Component({
  selector: 'app-kullanici-panel',
  templateUrl: './kullanici-panel.component.html',
  styleUrls: ['./kullanici-panel.component.scss']
})
export class KullaniciPanelComponent implements OnInit {
  userId: string = '';
  gelecekRezervasyonlar: Rezervasyon[] = [];
  guncelRezervasyonlar: Rezervasyon[] = [];
  gecmisRezervasyonlar: Rezervasyon[] = [];
  loading: boolean = true;

  constructor(
    private rezervasyonService: RezervasyonService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.rezervasyonlariYukle();
  }

  rezervasyonlariYukle(): void {
    const user = localStorage.getItem('currentUser');

    if (user) {
      const parsed = JSON.parse(user);
      this.userId = parsed.id || parsed.appUserId || parsed.userId || '';

      if (this.userId) {
        this.rezervasyonService.getByUser(this.userId).subscribe({
          next: (rezervasyonlar) => {
            const now = new Date();

            this.gelecekRezervasyonlar = [];
            this.guncelRezervasyonlar = [];
            this.gecmisRezervasyonlar = [];

            rezervasyonlar.forEach(r => {
              const giris = new Date(r.girisTarihi);
              const cikis = new Date(r.cikisTarihi);

              if (r.durum === 'IptalEdildi') {
                // Tarihi geçmiş olsa da olmasa da iptal edilenleri geçmişe atalım
                r.durum = RezervasyonDurumu.IptalEdildi;
                this.gecmisRezervasyonlar.push(r);
              }
              else if (cikis < now) {
                r.durum = RezervasyonDurumu.Gecmis;
                this.gecmisRezervasyonlar.push(r);
              }
              else if (giris <= now && cikis >= now && r.durum === RezervasyonDurumu.Onaylandi) {
                this.guncelRezervasyonlar.push(r);
              }
              else if (giris > now && r.durum === RezervasyonDurumu.Onaylandi) {
                this.gelecekRezervasyonlar.push(r);
              }
            });

            this.loading = false;
          },
          error: (err) => {
            console.error('Rezervasyon verisi alınamadı:', err);
            alert('Rezervasyonlar yüklenemedi. Lütfen daha sonra tekrar deneyin.');
            this.loading = false;
          }
        });
      }
    }
  }

  detayaGit(otelId: number): void {
    this.router.navigate(['/otel-detay', otelId]);
  }


  
  iptalEt(rezervasyonId: number): void {
    const onay = confirm('Bu rezervasyonu iptal etmek istediğinize emin misiniz?');
    if (!onay) return;

    this.rezervasyonService.iptalEt(rezervasyonId).subscribe({
      next: () => {
        alert('Rezervasyon başarıyla iptal edildi.');
        this.rezervasyonlariYukle(); // reload yerine listeyi taze yükle
      },
      error: (err) => {
        console.error('İptal hatası:', err);
        alert('Rezervasyon iptal edilemedi.');
      }
    });
  }
}