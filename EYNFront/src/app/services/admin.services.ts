import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Admin, AdminCreate, AdminUpdate, AdminLogin } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private baseUrl = 'https://localhost:7155/api/admin';

  constructor(private http: HttpClient) { }

  // Tüm adminleri getir
  getAll(): Observable<Admin[]> {
    return this.http.get<Admin[]>(this.baseUrl);
  }

  // ID ile admin getir
  getById(id: number): Observable<Admin> {
    return this.http.get<Admin>(`${this.baseUrl}/${id}`);
  }

  // Yeni admin oluştur
  create(admin: AdminCreate): Observable<Admin> {
    return this.http.post<Admin>(this.baseUrl, admin);
  }

  // Admin güncelle
  update(id: number, admin: AdminUpdate): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, admin);
  }

  // Admin sil
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  // Admin kimlik doğrulama
  authenticate(credentials: AdminLogin): Observable<Admin> {
    return this.http.post<Admin>(`${this.baseUrl}/authenticate`, credentials);
  }

  // Otel ID'sine göre admin getir
  getByOtel(otelId: number): Observable<Admin> {
    return this.http.get<Admin>(`${this.baseUrl}/otel/${otelId}`);
  }

  // Admin'in otellerini getir
  getOtellerByAdmin(adminId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${adminId}/oteller`);
  }

  // Admin şifresini getir
  getSifre(id: number): Observable<string> {
    return this.http.get<string>(`${this.baseUrl}/${id}/sifre`);
  }
}
