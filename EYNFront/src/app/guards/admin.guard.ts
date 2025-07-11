import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const admin = localStorage.getItem('currentAdmin');
    if (!admin) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
} 