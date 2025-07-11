import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor() {
    // localStorage'dan kullanıcı veya admin bilgisini yükle
    let user = null;
    const storedUser = localStorage.getItem('currentUser');
    const storedAdmin = localStorage.getItem('currentAdmin');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      user = { username: parsedUser.userName || parsedUser.adiSoyadi || parsedUser.email };
    } else if (storedAdmin) {
      const parsedAdmin = JSON.parse(storedAdmin);
      user = { adminName: parsedAdmin.kullaniciAdi || parsedAdmin.username };
    }
    this.currentUserSubject = new BehaviorSubject<any>(user);
    this.currentUser$ = this.currentUserSubject.asObservable();
  }

  login(user: any) {
    this.currentUserSubject.next(user);
    // localStorage ile kalıcı da tutabilirsiniz
    // Eğer admin ise şunu ekleyin:
    // localStorage.setItem('currentAdmin', JSON.stringify(user));
  }

  logout() {
    this.currentUserSubject.next(null);
    // localStorage temizleme
    localStorage.removeItem('currentUser');
    localStorage.removeItem('currentAdmin');
    localStorage.removeItem('token');
    localStorage.removeItem('adminToken');
  }

  getCurrentUser() {
  const storedUser = localStorage.getItem('currentUser');
  if (storedUser) {
    const parsedUser = JSON.parse(storedUser);
    return {
      email: parsedUser.email,
      username: parsedUser.userName || parsedUser.adiSoyadi || parsedUser.email
    };
  }

  const storedAdmin = localStorage.getItem('currentAdmin');
  if (storedAdmin) {
    const parsedAdmin = JSON.parse(storedAdmin);
    return {
      email: parsedAdmin.email || '',
      username: parsedAdmin.kullaniciAdi || parsedAdmin.username || 'Yönetici'
    };
  }

  return null;
}
} 