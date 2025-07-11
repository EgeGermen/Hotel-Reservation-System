import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseEntity } from '../models';

@Injectable({
  providedIn: 'root'
})
export abstract class BaseEntityService<T extends BaseEntity> {
  protected baseUrl: string;

  constructor(protected http: HttpClient, protected endpoint: string) {
    this.baseUrl = `https://localhost:7155/api/${endpoint}`;
  }

  // Tüm kayıtları getir
  getAll(): Observable<T[]> {
    return this.http.get<T[]>(this.baseUrl);
  }

  // ID ile kayıt getir
  getById(id: number): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${id}`);
  }

  // Yeni kayıt oluştur
  create(entity: Omit<T, 'id'>): Observable<T> {
    return this.http.post<T>(this.baseUrl, entity);
  }

  // Kayıt güncelle
  update(id: number, entity: T): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, entity);
  }

  // Kayıt sil
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
