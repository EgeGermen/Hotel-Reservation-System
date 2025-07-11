import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../../services/admin.services';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.scss'
})
export class AdminLoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  successMessage: string = '';
  loading: boolean = false;
  girisYapildi: boolean = false;

  constructor(
    private adminService: AdminService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    if (this.authService.getCurrentUser()) {
      this.router.navigate(['/admin']);
    }
  }

  onLogin() {
    this.errorMessage = '';
    this.successMessage = '';
    this.loading = true;
    this.girisYapildi = false;

    if (!this.username || !this.password) {
      this.errorMessage = 'Kullanıcı adı ve şifre alanları zorunludur.';
      this.loading = false;
      return;
    }

    const credentials = {
      kullaniciAdi: this.username,
      sifre: this.password
    };

    this.adminService.authenticate(credentials).subscribe({
      next: (response: any) => {
        this.successMessage = 'Admin girişi başarılı!';
        this.loading = false;
        // Admin bilgilerini localStorage'a kaydet
        localStorage.setItem('currentAdmin', JSON.stringify(response));
        localStorage.setItem('adminToken', response.token || '');
        this.authService.login({ adminName: response.kullaniciAdi || response.username });
        this.girisYapildi = true;
        // Admin paneline yönlendir
        setTimeout(() => {
          this.girisYapildi = false;
          this.router.navigate(['/']);
        }, 3000);
      },
      error: (error: any) => {
        if (error.error?.message && error.error.message.toLowerCase().includes('şifre')) {
          this.errorMessage = 'Şifreniz hatalı.';
        } else {
          this.errorMessage = 'Admin girişi başarısız: ' + (error.error?.message || 'Bilinmeyen hata');
        }
        this.loading = false;
      }
    });
  }
}
