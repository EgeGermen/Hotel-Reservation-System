import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rezervasyon, RezervasyonCreate, RezervasyonUpdate, RezervasyonAvailability } from '../models';

@Injectable({
  providedIn: 'root'
})
export class RezervasyonService {
  private baseUrl = 'https://localhost:7155/api/rezervasyon';

  constructor(private http: HttpClient) { }

  // Tüm rezervasyonları getir
  getAll(): Observable<Rezervasyon[]> {
    return this.http.get<Rezervasyon[]>(this.baseUrl);
  }

  // ID ile rezervasyon getir
  getById(id: number): Observable<Rezervasyon> {
    return this.http.get<Rezervasyon>(`${this.baseUrl}/${id}`);
  }

  // Yeni rezervasyon oluştur
  create(rezervasyon: RezervasyonCreate): Observable<Rezervasyon> {
    return this.http.post<Rezervasyon>(this.baseUrl, rezervasyon);
  }

  // Rezervasyon güncelle
  update(id: number, rezervasyon: RezervasyonUpdate): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, rezervasyon);
  }

iptalEt(id: number): Observable<void> {
  return this.http.post<void>(`${this.baseUrl}/${id}/cancel`, {});
}

  // Rezervasyon sil
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  // Uygunluk kontrolü
  checkAvailability(odaTipiId: number, giris: Date, cikis: Date): Observable<boolean> {
    const params = {
      odaTipiId: odaTipiId.toString(),
      giris: giris.toISOString(),
      cikis: cikis.toISOString()
    };
    return this.http.get<boolean>(`${this.baseUrl}/check`, { params });
  }

  // Rezervasyon onayla
  confirm(id: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/${id}/confirm`, {});
  }

  // Rezervasyon iptal et
  cancel(id: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/${id}/cancel`, {});
  }

  // Kullanıcının rezervasyonlarını getir
  getByAppUser(appUserId: string): Observable<Rezervasyon[]> {
    return this.http.get<Rezervasyon[]>(`${this.baseUrl}/kullanici/${appUserId}`);
  }

  // Kullanıcıya ait rezervasyonları getir
  getByUser(userId: string): Observable<Rezervasyon[]> {
    return this.http.get<Rezervasyon[]>(`https://localhost:7155/api/Rezervasyon/kullanici/${userId}`);
  }
}
