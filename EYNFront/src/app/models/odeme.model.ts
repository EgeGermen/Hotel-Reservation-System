import { OdemeYontemi, OdemeDurumu } from './enums.model';

export interface Odeme {
  id: number;
  rezervasyonId: number;
  tutar: number;
  odemeTarihi: Date;
  yontem: OdemeYontemi;
  durum: OdemeDurumu;
  kartIsim?: string;
  kartNo?: string;
  kartSKT?: string;
  kartCVV?: string;
}

export interface OdemeCreate {
  tutar: number;
  rezervasyonId: number;
  yontem: string;
  kartIsim?: string;
  kartNo?: string;
  kartSKT?: string;
  kartCVV?: string;
}

export interface OdemeUpdate {
  id: number;
  tutar: number;
  rezervasyonId: number;
  kartIsim?: string;
  kartNo?: string;
  kartSKT?: string;
  kartCVV?: string;
}
