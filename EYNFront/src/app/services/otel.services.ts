import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Otel, OtelCreate, OtelUpdate, OdaTipi } from '../models';

@Injectable({
  providedIn: 'root'
})
export class OtelService {
  private baseUrl = 'https://localhost:7155/api/otel';

  constructor(private http: HttpClient) { }

  // Tüm otelleri getir
  getAll(): Observable<Otel[]> {
    return this.http.get<Otel[]>(this.baseUrl);
  }

  // ID ile otel getir
  getById(id: number): Observable<Otel> {
    return this.http.get<Otel>(`${this.baseUrl}/${id}`);
  }

  // Yeni otel oluştur
  create(otel: OtelCreate): Observable<Otel> {
    return this.http.post<Otel>(this.baseUrl, otel);
  }

  // Otel güncelle
  update(id: number, otel: OtelUpdate): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, otel);
  }

  // Otel sil
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  // Otelin oda tiplerini getir
  getOdaTipleri(otelId: number): Observable<OdaTipi[]> {
    return this.http.get<OdaTipi[]>(`${this.baseUrl}/${otelId}/odaTipleri`);
  }

  // Otelin adminini getir
  getAdmin(otelId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${otelId}/admin`);
  }
} 