import { Component } from '@angular/core';
import { UserService } from '../../services/user.service'; // Yol doğruysa bu şekilde, değilse güncellenebilir
import { Router } from '@angular/router';

@Component({
  selector: 'app-kullanici-register',
  templateUrl: './kullanici-register.component.html',
  styleUrls: ['./kullanici-register.component.scss']
})
export class KullaniciRegisterComponent {

  kayitAd: string = '';
  kayitEmail: string = '';
  kayitSifre: string = '';
  kayitSifreTekrar: string = '';
  kayitBasarili: boolean = false;
  kayitRenk: string = 'success';

  constructor(private userService: UserService, private router: Router) {}

  onRegister() {
    const data = {
      KayitAd: this.kayitAd,
      KayitEmail: this.kayitEmail,
      KayitSifre: this.kayitSifre,
      KayitSifreTekrar: this.kayitSifreTekrar
    };

    this.userService.registerUser(data).subscribe({
      next: res => {
        this.kayitBasarili = true;
        this.kayitRenk = 'success';
        setTimeout(() => {
          this.kayitBasarili = false;
          this.router.navigate(['/kullanici-giris/login']);
        }, 3000);
      },
      error: err => console.error(err)
    });
  }
}
