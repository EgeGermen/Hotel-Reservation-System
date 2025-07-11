import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OtelService } from '../services/otel.services';

@Component({
  selector: 'app-rezervasyon-onay',
  templateUrl: './rezervasyon-onay.component.html',
  styleUrl: './rezervasyon-onay.component.scss'
})
export class RezervasyonOnayComponent {
  odaAdi?: string;
  otelAdi?: string;
  otelId?: number;
  kisiSayisi?: number;
  girisTarihi?: string;
  cikisTarihi?: string;
  toplamFiyat?: number;
  ad?: string;
  soyad?: string;
  email?: string;
  telefon?: string;
  cocukSayisi?: number;
  cocukYaslari?: ("0-6"|"7-12"|null)[];
  get cocukYasOzet() {
    if (!this.cocukYaslari) return [];
    const ozet: {yas: string, count: number}[] = [];
    const y6 = this.cocukYaslari.filter(y => y === '0-6').length;
    const y12 = this.cocukYaslari.filter(y => y === '7-12').length;
    if (y6 > 0) ozet.push({yas: '0-6', count: y6});
    if (y12 > 0) ozet.push({yas: '7-12', count: y12});
    return ozet;
  }

  constructor(private router: Router, private otelService: OtelService) {
    const state = this.router.getCurrentNavigation()?.extras.state as any;
    if (state) {
      this.odaAdi = state.odaAdi;
      this.otelId = state.otelId;
      this.kisiSayisi = state.kisiSayisi;
      this.girisTarihi = state.girisTarihi;
      this.cikisTarihi = state.cikisTarihi;
      this.toplamFiyat = state.toplamFiyat;
      this.ad = state.ad;
      this.soyad = state.soyad;
      this.email = state.email;
      this.telefon = state.telefon;
      this.cocukSayisi = state.cocukSayisi;
      this.cocukYaslari = state.cocukYaslari;
      if (this.otelId) {
        this.otelService.getById(this.otelId).subscribe(otel => {
          this.otelAdi = otel.otelAdi;
        });
      }
    }
  }
}
