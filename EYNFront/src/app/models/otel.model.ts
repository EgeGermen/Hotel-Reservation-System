import { OtelResim } from './otel-resim.model';

export interface Otel {
  id: number;
  otelAdi: string;
  email: string;
  telefon: string;
  adresSatiri1: string;
  sehir: string;
  ulke: string;
  puan?: number;
  otelResimler?: OtelResim[];
}

export interface OtelCreate {
  otelAdi: string;
  email: string;
  telefon: string;
  adresSatiri1: string;
  sehir: string;
  ulke: string;
  puan?: number;
  adminId: number;
}

export interface OtelUpdate {
  id: number;
  otelAdi: string;
  email: string;
  telefon: string;
  adresSatiri1: string;
  sehir: string;
  ulke: string;
  puan?: number;
  adminId: number;
} 