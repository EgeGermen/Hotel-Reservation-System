import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OdaTipi, OdaTipiCreate, OdaTipiUpdate } from '../models';

@Injectable({
  providedIn: 'root'
})
export class OdaTipiService {
  private baseUrl = 'https://localhost:7155/api/odatipi';

  constructor(private http: HttpClient) { }

  // Tüm oda tiplerini getir
  getAll(): Observable<OdaTipi[]> {
    return this.http.get<OdaTipi[]>(this.baseUrl);
  }

  // ID ile oda tipi getir
  getById(id: number): Observable<OdaTipi> {
    return this.http.get<OdaTipi>(`${this.baseUrl}/${id}`);
  }

  // Yeni oda tipi oluştur
  create(odaTipi: OdaTipiCreate): Observable<OdaTipi> {
    return this.http.post<OdaTipi>(this.baseUrl, odaTipi);
  }

  // Oda tipi güncelle
  update(id: number, odaTipi: OdaTipiUpdate): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, odaTipi);
  }

  // Oda tipi sil
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  // Otel ID'sine göre oda tiplerini getir
  getByOtel(otelId: number): Observable<OdaTipi[]> {
    return this.http.get<OdaTipi[]>(`${this.baseUrl}/otel/${otelId}`);
  }

  // Uygunluk kontrolü
  checkAvailability(odaTipiId: number, giris: Date, cikis: Date): Observable<boolean> {
    const params = {
      odaTipiId: odaTipiId.toString(),
      giris: giris.toISOString(),
      cikis: cikis.toISOString()
    };
    return this.http.get<boolean>(`${this.baseUrl}/availability`, { params });
  }
}
