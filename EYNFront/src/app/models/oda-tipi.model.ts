import { OdaTipiEnum } from './enums.model';
import { OdaTipiResim } from './oda-tipi-resim.model';

export interface OdaTipi {
  id: number;
  odaTipiAdi: string;
  aciklama?: string;
  otelId: number;
  kapasite: number;
  fiyat: number;
  odaTipi?: OdaTipiEnum; // Enum değeri (opsiyonel)
  odaSayisi: number;
  odaTipiResimler?: OdaTipiResim[];
  indirimOrani?: number;
}

export interface OdaTipiCreate {
  odaTipiAdi: string;
  aciklama?: string;
  otelId: number;
  kapasite: number;
  fiyat: number;
  odaSayisi: number;
  odaTipi?: OdaTipiEnum;
  indirimOrani?: number;

}

export interface OdaTipiUpdate {
  id: number;
  odaTipiAdi: string;
  aciklama?: string;
  otelId: number;
  kapasite: number;
  fiyat: number;
  odaSayisi: number;
  odaTipi?: OdaTipiEnum;
  indirimOrani?: number;

}
