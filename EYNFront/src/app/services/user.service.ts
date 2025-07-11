import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, UserCreate, UserUpdate, ChangePassword, UserSettings } from '../models';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'https://localhost:7155/api/users';

  constructor(private http: HttpClient) { }

  // Kullanıcı kaydı
  registerUser(userData: any): Observable<any> {
    const userCreate: UserCreate = {
      KayitAd: userData.KayitAd,
      KayitEmail: userData.KayitEmail,
      KayitSifre: userData.KayitSifre,
      KayitSifreTekrar: userData.KayitSifreTekrar
    };
    return this.http.post<any>(`${this.baseUrl}`, userCreate);
  }

  // Kullanıcı girişi
  loginUser(email: string, password: string): Observable<any> {
    // password yerine sifre gönderiyoruz!
    return this.http.post<any>(`${this.baseUrl}/login`, { email, sifre: password });
  }

  // Tüm kullanıcıları getir
  getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl);
  }

  // ID ile kullanıcı getir
  getById(id: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${id}`);
  }

  // Kullanıcı güncelle
  update(id: string, user: UserUpdate): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, user);
  }

  // Kullanıcı sil
  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  // Kullanıcının rezervasyonlarını getir
  getReservationsByUser(id: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${id}/reservations`);
  }

  // Kullanıcının ödemelerini getir
  getPaymentsByUser(id: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${id}/payments`);
  }

  // Şifre değiştir
  changePassword(id: string, changePassword: ChangePassword): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/${id}/changepassword`, changePassword);
  }

  // Kullanıcı ayarlarını getir
  getSettings(id: string): Observable<UserSettings> {
    return this.http.get<UserSettings>(`${this.baseUrl}/${id}/settings`);
  }

  // Kullanıcı ayarlarını güncelle
  updateSettings(id: string, settings: UserSettings): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}/settings`, settings);
  }
}
