import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-ayarlar',
  templateUrl: './ayarlar.component.html',
  styleUrls: ['./ayarlar.component.scss']
})
export class AyarlarComponent implements OnInit {
  user: User = { id: '', userName: '', email: '', adiSoyadi: '', telefon: '' };
  yeniSifre: string = '';
  yeniSifreTekrar: string = '';
  mesaj: string = '';
  hata: string = '';
  eskiSifre: string = '';

  constructor(private userService: UserService) {}

  ngOnInit() {
    // Local storage'dan kullanıcı bilgilerini al
    const userStr = localStorage.getItem('currentUser');
    if (userStr) {
      const localUser = JSON.parse(userStr);
      // API'den güncel kullanıcı bilgisini çek
      this.userService.getById(localUser.id).subscribe({
        next: (apiUser) => {
          this.user = apiUser;
          if (!this.user.telefon) this.user.telefon = '';
          // localStorage'ı da güncelle
          localStorage.setItem('currentUser', JSON.stringify(this.user));
        },
        error: () => {
          // API'den çekilemezse localStorage'daki bilgiyi kullan
          this.user = localUser;
          if (!this.user.telefon) this.user.telefon = '';
        }
      });
    }
  }

  kaydet(form?: NgForm) {
    this.hata = '';
    this.mesaj = '';
    
    if (this.yeniSifre && this.yeniSifre !== this.yeniSifreTekrar) {
      this.hata = 'Şifreler uyuşmuyor!';
      return;
    }

    // Kullanıcı bilgilerini güncelle
    const settings = {
      adiSoyadi: this.user.adiSoyadi,
      email: this.user.email
    };

    this.userService.updateSettings(this.user.id, settings).subscribe({
      next: () => {
        this.mesaj = 'Bilgileriniz güncellendi!';
        // localStorage'ı güncelle
        const updatedUser = { ...this.user, adiSoyadi: settings.adiSoyadi, email: settings.email };
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
        // Şifre değişikliği varsa
        if (this.yeniSifre) {
          const changePassword = {
            oldPassword: '', // Bu alanı kullanıcıdan almak gerekebilir
            newPassword: this.yeniSifre
          };
          this.userService.changePassword(this.user.id, changePassword).subscribe({
            next: () => {
              this.mesaj += ' Şifreniz de güncellendi!';
            },
            error: (error) => {
              this.hata = 'Şifre güncellenirken hata oluştu: ' + error.message;
            }
          });
        }
        this.yeniSifre = '';
        this.yeniSifreTekrar = '';
        if (form) form.resetForm({ 
          adiSoyadi: this.user.adiSoyadi, 
          email: this.user.email, 
          telefon: this.user.telefon,
          yeniSifre: '', 
          yeniSifreTekrar: '' 
        });
      },
      error: (error) => {
        this.hata = 'Güncelleme sırasında hata oluştu: ' + error.message;
      }
    });
  }
}
