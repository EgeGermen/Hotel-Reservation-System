import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { OtelService } from '../services/otel.services';
import { Otel } from '../models';
import { OtelResimService } from '../services/otel-resim.services';
import { OtelResim } from '../models/otel-resim.model';

export interface FiltreKriterleri {
  sehir: string;
  ulke: string;
  minPuan: number;
  maxPuan: number;
  aramaMetni: string;
  siralama: string;
}

@Component({
  selector: 'app-otel-filtre',
  templateUrl: './otel-filtre.component.html',
  styleUrls: ['./otel-filtre.component.scss']
})
export class OtelFiltreComponent implements OnInit {
  @Output() filtreDegisti = new EventEmitter<FiltreKriterleri>();

  filtreForm: FormGroup;
  oteller: Otel[] = [];
  sehirler: string[] = [];
  ulkeler: string[] = [];
  loading = false;
  otelResimler: { [otelId: number]: OtelResim[] } = {};

  constructor(
    private otelService: OtelService,
    private otelResimService: OtelResimService,
    private fb: FormBuilder
  ) {
    this.filtreForm = this.fb.group({
      sehir: [''],
      ulke: [''],
      minPuan: [0],
      maxPuan: [10],
      aramaMetni: [''],
      siralama: ['otelAdi']
    });
  }

  ngOnInit(): void {
    this.loadOteller();
    this.setupFormListeners();
  }

  loadOteller(): void {
    this.loading = true;
    this.otelService.getAll().subscribe({
      next: (oteller) => {
        this.oteller = oteller;
        this.extractUniqueValues();
        this.loading = false;
        // Otel resimlerini çek
        oteller.forEach(otel => {
          this.otelResimService.getByOtelId(otel.id).subscribe(resimler => {
            this.otelResimler[otel.id] = resimler;
          });
        });
      },
      error: (error) => {
        console.error('Oteller yüklenirken hata:', error);
        this.loading = false;
      }
    });
  }

  extractUniqueValues(): void {
    // Benzersiz şehirleri çıkar
    this.sehirler = [...new Set(this.oteller.map(otel => otel.sehir))].sort();
    
    // Benzersiz ülkeleri çıkar
    this.ulkeler = [...new Set(this.oteller.map(otel => otel.ulke))].sort();
  }

  setupFormListeners(): void {
    // Form değişikliklerini dinle
    this.filtreForm.valueChanges.subscribe(() => {
      this.applyFilters();
    });
  }

  applyFilters(): void {
    const filtreler = this.filtreForm.value;
    this.filtreDegisti.emit(filtreler);
  }

  clearFilters(): void {
    this.filtreForm.patchValue({
      sehir: '',
      ulke: '',
      minPuan: 0,
      maxPuan: 10,
      aramaMetni: '',
      siralama: 'otelAdi'
    });
  }

  onPuanChange(): void {
    const { minPuan, maxPuan } = this.filtreForm.value;
    
    // Min puan max puandan büyükse düzelt
    if (minPuan > maxPuan) {
      this.filtreForm.patchValue({ maxPuan: minPuan });
    }
    
    // Max puan min puandan küçükse düzelt
    if (maxPuan < minPuan) {
      this.filtreForm.patchValue({ minPuan: maxPuan });
    }
  }

  getFilteredOteller(): Otel[] {
    const filtreler = this.filtreForm.value;
    let filtered = [...this.oteller];

    // Arama metni filtresi
    if (filtreler.aramaMetni) {
      const searchTerm = filtreler.aramaMetni.toLowerCase();
      filtered = filtered.filter(otel => 
        otel.otelAdi.toLowerCase().includes(searchTerm) ||
        otel.sehir.toLowerCase().includes(searchTerm) ||
        otel.ulke.toLowerCase().includes(searchTerm)
      );
    }

    // Şehir filtresi
    if (filtreler.sehir) {
      filtered = filtered.filter(otel => otel.sehir === filtreler.sehir);
    }

    // Ülke filtresi
    if (filtreler.ulke) {
      filtered = filtered.filter(otel => otel.ulke === filtreler.ulke);
    }

    // Puan filtresi
    filtered = filtered.filter(otel => {
      const puan = otel.puan || 0;
      return puan >= filtreler.minPuan && puan <= filtreler.maxPuan;
    });

    // Sıralama
    filtered.sort((a, b) => {
      let aValue: any = a[filtreler.siralama as keyof Otel];
      let bValue: any = b[filtreler.siralama as keyof Otel];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return aValue.toLowerCase().localeCompare(bValue.toLowerCase());
      }

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return aValue - bValue;
      }

      return 0;
    });

    return filtered;
  }

  getActiveFilterCount(): number {
    const filtreler = this.filtreForm.value;
    let count = 0;

    if (filtreler.sehir) count++;
    if (filtreler.ulke) count++;
    if (filtreler.minPuan > 0) count++;
    if (filtreler.maxPuan < 10) count++;
    if (filtreler.aramaMetni) count++;

    return count;
  }

  getPuanLabel(value: number): string {
    if (value === 0) return 'Tümü';
    if (value === 10) return '10+';
    return `${value}+`;
  }

  getSehirCount(sehir: string): number {
    return this.oteller.filter(otel => otel.sehir === sehir).length;
  }

  getUlkeCount(ulke: string): number {
    return this.oteller.filter(otel => otel.ulke === ulke).length;
  }

  getOtelImage(otel: Otel): string {
    const resimler = this.otelResimler[otel.id];
    if (resimler && resimler.length > 0) {
      return resimler[0].resimUrl;
    }
    return `https://via.placeholder.com/300x200/007bff/ffffff?text=${encodeURIComponent(otel.otelAdi)}`;
  }

  closeSidebar(): void {
    // Mobil görünümde sidebar'ı kapatmak için kullanılacak
    // Bu metod parent component tarafından çağrılabilir
    console.log('Sidebar kapatıldı');
  }
}
