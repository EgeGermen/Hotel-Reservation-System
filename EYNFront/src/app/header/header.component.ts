import { Component, OnInit, HostListener } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  currentUser: any = null;
  dropdownOpen = false;
  cikisYapildi: boolean = false;
  cikisRenk: string = 'danger';
  userEmail: string = '';
  userName: string = '';
  userPhone: string = '';
  isUser: boolean = false;
  isAdmin: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
      this.isUser = false;
      this.isAdmin = false;
      if (user) {
        this.userEmail = user.email || user.Email || '';
        this.userName = user.adiSoyadi || user.userName || user.username || user.adminName || '';
        this.userPhone = user.telefon || '';
        this.isUser = !!user.username;
        this.isAdmin = !!user.adminName;
      } else {
        this.userEmail = '';
        this.userName = '';
        this.userPhone = '';
      }
    });
  }

  logout() {
    this.authService.logout();
    this.dropdownOpen = false;
    this.cikisYapildi = true;
    this.cikisRenk = 'danger';
    setTimeout(() => {
      this.cikisYapildi = false;
      this.router.navigate(['/']);
    }, 3000);
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  goToSettings() {
    this.router.navigate(['/ayarlar']);
    this.dropdownOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.navbar__user-dropdown')) {
      this.dropdownOpen = false;
    }
  }
}
