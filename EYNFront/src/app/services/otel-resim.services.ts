import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OtelResim } from '../models/otel-resim.model';

export * from './otel-resim.services';

@Injectable({ providedIn: 'root' })
export class OtelResimService {
  private baseUrl = 'https://localhost:7155/api/otelresim';

  constructor(private http: HttpClient) {}

  getByOtelId(otelId: number): Observable<OtelResim[]> {
    return this.http.get<OtelResim[]>(`${this.baseUrl}/otel/${otelId}`);
  }

  add(resim: Partial<OtelResim>): Observable<OtelResim> {
    return this.http.post<OtelResim>(this.baseUrl, resim);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
} 