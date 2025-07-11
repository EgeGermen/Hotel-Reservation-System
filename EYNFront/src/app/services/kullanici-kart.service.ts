import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class KullaniciKartService {
  private apiUrl = 'https://localhost:7155/api/KullaniciKart'; // API adresini kendi backend adresine göre güncelle

  constructor(private http: HttpClient) {}

  getUserCards(userId: string) {
    return this.http.get<any[]>(`${this.apiUrl}/${userId}`);
  }

  addCard(card: any) {
    return this.http.post<any>(this.apiUrl, card);
  }

  deleteCard(cardId: number) {
    return this.http.delete(`${this.apiUrl}/${cardId}`);
  }
} 