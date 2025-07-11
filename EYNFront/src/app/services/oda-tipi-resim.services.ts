import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OdaTipiResim } from '../models/oda-tipi-resim.model';

@Injectable({ providedIn: 'root' })
export class OdaTipiResimService {
  private baseUrl = 'https://localhost:7155/api/odatipiresim';

  constructor(private http: HttpClient) {}

  getByOdaTipiId(odaTipiId: number): Observable<OdaTipiResim[]> {
    return this.http.get<OdaTipiResim[]>(`${this.baseUrl}/odatipi/${odaTipiId}`);
  }

  add(resim: Partial<OdaTipiResim>): Observable<OdaTipiResim> {
    return this.http.post<OdaTipiResim>(this.baseUrl, resim);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
} 