import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const admin = localStorage.getItem('currentAdmin');
    if (admin) {
      // Admin ise ana sayfaya yönlendir
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
} 