import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-kullanici-login',
  templateUrl: './kullanici-login.component.html',
  styleUrl: './kullanici-login.component.scss'
})
export class KullaniciLoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  successMessage: string = '';
  loading: boolean = false;
  girisYapildi: boolean = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    if (this.authService.getCurrentUser()) {
      this.router.navigate(['/']);
    }
  }

  onLogin() {
    this.errorMessage = '';
    this.successMessage = '';
    this.loading = true;
    this.girisYapildi = false;

    if (!this.email || !this.password) {
      this.errorMessage = 'E-posta ve şifre alanları zorunludur.';
      this.loading = false;
      return;
    }

    this.userService.loginUser(this.email, this.password).subscribe({
      next: (response) => {
        if (response.message) {
          // Hatalı giriş
          this.errorMessage = 'Giriş başarısız: ' + response.message;
          this.successMessage = '';
          this.loading = false;
          console.log('Giriş başarısız');
          return;
        }
        // Başarılı giriş
        this.successMessage = 'Giriş başarılı!';
        this.errorMessage = '';
        this.loading = false;
        localStorage.setItem('token', response.token?.accessToken);
        const userObj = response.User || response.user;
        if (userObj) {
          localStorage.setItem('currentUser', JSON.stringify(userObj));
          this.authService.login({ username: userObj.userName || userObj.adiSoyadi || userObj.email });
        }
        this.girisYapildi = true;
        setTimeout(() => {
          this.girisYapildi = false;
          this.router.navigate(['/']);
        }, 3000);
      },
      error: (error) => {
        if (error.error?.message && error.error.message.toLowerCase().includes('şifre')) {
          this.errorMessage = 'Şifreniz hatalı.';
        } else {
          this.errorMessage = 'Giriş başarısız: ' + (error.error?.message || 'Bilinmeyen hata');
        }
        this.successMessage = '';
        this.loading = false;
        console.log('Giriş başarısız');
      }
    });
  }
}
