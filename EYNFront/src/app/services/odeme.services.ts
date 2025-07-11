import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Odeme, OdemeCreate, OdemeUpdate } from '../models';

@Injectable({
  providedIn: 'root'
})
export class OdemeService {
  private baseUrl = 'https://localhost:7155/api/odeme';

  constructor(private http: HttpClient) { }

  // Tüm ödemeleri getir
  getAll(): Observable<Odeme[]> {
    return this.http.get<Odeme[]>(this.baseUrl);
  }

  // ID ile ödeme getir
  getById(id: number): Observable<Odeme> {
    return this.http.get<Odeme>(`${this.baseUrl}/${id}`);
  }

  // Yeni ödeme oluştur
  create(odeme: OdemeCreate): Observable<Odeme> {
    return this.http.post<Odeme>(this.baseUrl, odeme);
  }

  // Ödeme güncelle
  update(id: number, odeme: OdemeUpdate): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, odeme);
  }

  // Ödeme sil
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  // Ödeme işlemini yürüt
  process(id: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/${id}/process`, {});
  }

  // Rezervasyona ait ödemeleri getir
  getByRezervasyon(rezervasyonId: number): Observable<Odeme[]> {
    return this.http.get<Odeme[]>(`${this.baseUrl}/rezervasyon/${rezervasyonId}`);
  }

  // Kullanıcıya ait ödemeleri getir
  getByUser(userId: string): Observable<Odeme[]> {
    return this.http.get<Odeme[]>(`https://localhost:7155/api/users/${userId}/payments`);
  }
}
