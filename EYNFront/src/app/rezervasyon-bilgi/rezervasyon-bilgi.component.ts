import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OdemeYontemi, OdemeDurumu } from '../models/enums.model';
import { OdemeService } from '../services/odeme.services';
import { RezervasyonService } from '../services/rezervasyon.services';
import { Rezervasyon } from '../models/rezervasyon.model';
import { Odeme } from '../models/odeme.model';
import { UserService } from '../services/user.service';
import { OdaTipi } from '../models';
import { KullaniciKartService } from '../services/kullanici-kart.service';

@Component({
  selector: 'app-rezervasyon-bilgi',
  templateUrl: './rezervasyon-bilgi.component.html',
  styleUrl: './rezervasyon-bilgi.component.scss'
})
export class RezervasyonBilgiComponent {
  oda: any = null;
  kisiSayisi: number = 1;
  girisTarihi: string = '';
  cikisTarihi: string = '';
  toplamFiyat: number = 0;
  IndirimliFiyat: number =0 ;
  gunSayisi: number = 1;
  cocukSayisi: number = 0;
  cocukYaslari: ("0-6"|"7-12"|null)[] = [];
  get cocukYasOzet() {
    const ozet: {yas: string, count: number}[] = [];
    const y6 = this.cocukYaslari.filter(y => y === '0-6').length;
    const y12 = this.cocukYaslari.filter(y => y === '7-12').length;
    if (y6 > 0) ozet.push({yas: '0-6', count: y6});
    if (y12 > 0) ozet.push({yas: '7-12', count: y12});
    return ozet;
  }

  // Payment
  odemeYontemleri = [OdemeYontemi.KrediKart, OdemeYontemi.Nakit];
  seciliOdeme: OdemeYontemi|null = null;
  kartKayitli: boolean = false;
  yeniKartGoster: boolean = false;
  kayitliKartNo: string = '';
  tumKartlar: Odeme[] = [];
  selectedCardIndex: number | 'new' | null = null;

  // Form fields
  ad = '';
  soyad = '';
  email = '';
  telefon = '';
  kartIsim = '';
  kartNo = '';
  kartSKT = '';
  kartCVV = '';

  userId: string = '';
  loading: boolean = false;

  constructor(private router: Router, private rezervasyonService: RezervasyonService, private userService: UserService, private kullaniciKartService: KullaniciKartService) {
    const nav = this.router.getCurrentNavigation();
    const state = nav?.extras.state as any;
    if (state) {
      this.oda = state.oda;
      this.kisiSayisi = +state.kisiSayisi;
      this.girisTarihi = state.girisTarihi;
      this.cikisTarihi = state.cikisTarihi;
      this.cocukSayisi = state.cocukSayisi || 0;
      this.cocukYaslari = state.cocukYaslari || [];
      this.gunSayisi = this.tarihFarkGun(this.girisTarihi, this.cikisTarihi);
      // Fiyat hesaplama: çocuk yaşlarına göre
      const y6 = this.cocukYaslari.filter(y => y === '0-6').length;
      const y12 = this.cocukYaslari.filter(y => y === '7-12').length;
      const yetiskinSayisi = this.kisiSayisi;
      // İndirimli fiyatı belirle
      let birimFiyat = this.oda.fiyat;
      if (this.oda.indirimOrani && this.oda.indirimOrani > 0) {
        birimFiyat = birimFiyat * (1 - this.oda.indirimOrani / 100);
      }
      const cocukEkstra = (birimFiyat * 0.5) * y12;
      this.toplamFiyat = (birimFiyat * this.gunSayisi * yetiskinSayisi) + (cocukEkstra * this.gunSayisi);

    }
    // Kullanıcı id'sini al
    const user = localStorage.getItem('currentUser');
    if (user) {
      const parsed = JSON.parse(user);
      this.userId = parsed.id || parsed.appUserId || parsed.userId || '';
      console.log('currentUser:', parsed, 'Kullanılan userId:', this.userId);
      this.fetchUserCards();
      // Kullanıcı bilgilerini çek ve formu doldur
      this.userService.getById(this.userId).subscribe(u => {
        if (u) {
          if (u.adiSoyadi) {
            const [ad, ...soyadArr] = u.adiSoyadi.split(' ');
            this.ad = ad;
            this.soyad = soyadArr.join(' ');
          }
          if (u.email) this.email = u.email;
          if (u.userName && !this.email) this.email = u.userName;
          if (u.telefon) this.telefon = u.telefon;
        }
      });
    }
  }

  fetchUserCards() {
    this.kullaniciKartService.getUserCards(this.userId).subscribe(kartlar => {
      this.tumKartlar = kartlar;
      if (this.tumKartlar.length > 0) {
        this.kartKayitli = true;
        this.selectedCardIndex = 0;
      } else {
        this.kartKayitli = false;
        this.selectedCardIndex = 'new';
      }
      this.yeniKartGoster = false;
    });
  }

  tarihFarkGun(t1: string, t2: string): number {
    const d1 = new Date(t1);
    const d2 = new Date(t2);
    const diff = d2.getTime() - d1.getTime();
    return Math.max(1, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  }

  odemeYontemiSec(yontem: OdemeYontemi) {
    this.seciliOdeme = yontem;
    if (yontem === OdemeYontemi.KrediKart) {
      if (this.tumKartlar.length > 0) {
        this.selectedCardIndex = 0;
        this.yeniKartGoster = false;
      } else {
        this.selectedCardIndex = 'new';
        this.yeniKartGoster = true;
      }
    } else {
      this.selectedCardIndex = null;
      this.yeniKartGoster = false;
    }
  }

  yeniKartAc() {
    this.selectedCardIndex = 'new';
    this.yeniKartGoster = true;
    this.kartIsim = '';
    this.kartNo = '';
    this.kartSKT = '';
    this.kartCVV = '';
  }

  duzenleKart(index: number) {
    const kart = this.tumKartlar[index];
    if (!kart) return;
    this.selectedCardIndex = 'new';
    this.yeniKartGoster = true;
    this.kartIsim = kart.kartIsim || '';
    this.kartNo = kart.kartNo || '';
    this.kartSKT = kart.kartSKT || '';
    this.kartCVV = kart.kartCVV || '';
    // Düzenleme modunda olduğumuzu belirtecek bir flag eklenebilir
  }

  kartiKaydet() {
    if (!this.kartIsim || !this.kartNo || !this.kartSKT || !this.kartCVV) return;
    const yeniKart = {
      kullaniciId: this.userId,
      kartIsim: this.kartIsim,
      kartNo: this.kartNo,
      kartSKT: this.kartSKT,
      kartCVV: this.kartCVV
    };
    this.kullaniciKartService.addCard(yeniKart).subscribe(kart => {
      this.tumKartlar.push(kart);
      this.selectedCardIndex = this.tumKartlar.length - 1;
      this.yeniKartGoster = false;
      this.kartIsim = '';
      this.kartNo = '';
      this.kartSKT = '';
      this.kartCVV = '';
    });
  }

  silKart(index: number) {
    const kart = this.tumKartlar[index];
    if (!kart) return;
    if (confirm('Bu kartı silmek istediğinize emin misiniz?')) {
      this.kullaniciKartService.deleteCard(kart.id).subscribe({
        next: () => {
          this.tumKartlar.splice(index, 1);
          if (this.tumKartlar.length === 0) {
            this.selectedCardIndex = 'new';
            this.yeniKartGoster = true;
          } else {
            this.selectedCardIndex = 0;
          }
        },
        error: () => alert('Kart silinemedi!')
      });
    }
  }

  formGecerli(): boolean {
    // Tüm zorunlu alanlar dolu mu?
    if (!this.ad || !this.soyad || !this.email || !this.telefon) return false;
    // Otele girişte ödeme seçiliyse
    if (this.seciliOdeme === OdemeYontemi.Nakit) return true;
    // Kredi kartı seçiliyse ve kayıtlı kartlardan biri seçiliyse
    if (this.seciliOdeme === OdemeYontemi.KrediKart && this.selectedCardIndex !== 'new' && this.selectedCardIndex !== null && this.selectedCardIndex !== undefined) {
      return !isNaN(Number(this.selectedCardIndex));
    }
    // Diğer durumlarda (ör: yeni kart ekleme) false
    return false;
  }

  ileri() {
    if (!this.formGecerli()) return;
    this.loading = true;
    // 1. Rezervasyon oluştur
    const rezervasyon = {
      appUserId: this.userId,
      odaTipiId: this.oda.id,
      girisTarihi: new Date(this.girisTarihi),
      cikisTarihi: new Date(this.cikisTarihi),
      toplamUcret: this.toplamFiyat
    };
    this.rezervasyonService.create(rezervasyon).subscribe({
      next: newRez => {
        // Sadece rezervasyon ve onay işlemi yap
        this.rezervasyonService.confirm(newRez.id).subscribe({
          next: () => {
            this.loading = false;
            this.router.navigate(['/rezervasyon/onay'], {
              state: {
                odaAdi: this.oda?.odaTipiAdi || this.oda?.ad || '-',
                otelId: this.oda?.otelId,
                kisiSayisi: this.kisiSayisi,
                girisTarihi: this.girisTarihi,
                cikisTarihi: this.cikisTarihi,
                toplamFiyat: this.toplamFiyat,
                ad: this.ad,
                soyad: this.soyad,
                email: this.email,
                telefon: this.telefon,
                cocukSayisi: this.cocukSayisi,
                cocukYaslari: this.cocukYaslari
              }
            });
          },
          error: () => { this.loading = false; }
        });
      },
      error: () => { this.loading = false; }
    });
  }
  OdemeYontemi = OdemeYontemi;
}
