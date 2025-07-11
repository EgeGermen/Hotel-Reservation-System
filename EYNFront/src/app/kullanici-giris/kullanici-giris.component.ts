import { Component } from '@angular/core';

@Component({
  selector: 'app-kullanici-giris',
  templateUrl: './kullanici-giris.component.html',
  styleUrls: ['./kullanici-giris.component.scss']
})
export class KullaniciGirisComponent {
  aktifForm: 'giris' | 'kayit' | 'admin' = 'giris';

  // Giriş formu
  girisEmail: string = '';
  girisSifre: string = '';

  // Kayıt formu
  kayitAd: string = '';
  kayitEmail: string = '';
  kayitSifre: string = '';
  kayitSifreTekrar: string = '';

  // Admin formu
  adminKullanici: string = '';
  adminSifre: string = '';

  formSec(form: 'giris' | 'kayit' | 'admin') {
    this.aktifForm = form;
  }
}
