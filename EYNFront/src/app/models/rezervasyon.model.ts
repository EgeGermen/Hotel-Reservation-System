import { RezervasyonDurumu } from './enums.model';

export interface Rezervasyon {
  id: number;
  appUserId: string;
  odaTipiId: number;
  girisTarihi: Date;
  cikisTarihi: Date;
  rezervasyonTarihi: Date;
  durum: RezervasyonDurumu;
  toplamUcret: number;
  otelAdi?: string;
  otelId?: number;
}

export interface RezervasyonCreate {
  appUserId: string;
  odaTipiId: number;
  girisTarihi: Date;
  cikisTarihi: Date;
}

export interface RezervasyonUpdate {
  id: number;
  appUserId: string;
  odaTipiId: number;
  girisTarihi: Date;
  cikisTarihi: Date;
}

export interface RezervasyonAvailability {
  odaTipiId: number;
  giris: Date;
  cikis: Date;
}
