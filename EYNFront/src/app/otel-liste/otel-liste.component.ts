import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OtelService } from '../services/otel.services';
import { Otel } from '../models';
import { FiltreKriterleri } from '../otel-filtre/otel-filtre.component';
import { OtelResimService } from '../services/otel-resim.services';
import { OtelResim } from '../models/otel-resim.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-otel-liste',
  templateUrl: './otel-liste.component.html',
  styleUrls: ['./otel-liste.component.scss']
})
export class OtelListeComponent implements OnInit {
  @Input() loading = false;
  @Output() otelSelected = new EventEmitter<Otel>();

  allOteller: Otel[] = [];
  filteredOteller: Otel[] = [];
  currentPage = 1;
  itemsPerPage = 12;
  sortBy = 'otelAdi';
  sortOrder: 'asc' | 'desc' = 'asc';
  searchParams: any = {};
  showSidebar = true; // Mobilde sidebar'ı gizlemek için
  otelResimler: { [otelId: number]: OtelResim[] } = {};

  constructor(
    private otelService: OtelService,
    private route: ActivatedRoute,
    private router: Router,
    private otelResimService: OtelResimService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadOteller();
    this.loadSearchParams();
  }

  loadOteller(): void {
    this.loading = true;
    this.otelService.getAll().subscribe({
      next: (oteller) => {
        this.allOteller = oteller;
        this.filteredOteller = [...oteller];
        this.applySearchFilters();
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

  loadSearchParams(): void {
    this.route.queryParams.subscribe(params => {
      this.searchParams = params;
      if (this.allOteller.length > 0) {
        this.applySearchFilters();
      }
    });
  }

  applySearchFilters(): void {
    let filtered = [...this.allOteller];

    // Şehir filtresi
    if (this.searchParams.sehir) {
      filtered = filtered.filter(otel => 
        otel.sehir.toLowerCase().includes(this.searchParams.sehir.toLowerCase())
      );
    }

    // Otel adı filtresi
    if (this.searchParams.otelAdi) {
      filtered = filtered.filter(otel => 
        otel.otelAdi.toLowerCase().includes(this.searchParams.otelAdi.toLowerCase())
      );
    }

    // Eğer hiç filtre yoksa tüm otelleri göster
    this.filteredOteller = filtered;
    this.currentPage = 1; // İlk sayfaya dön
  }

  onOtelClick(otel: Otel): void {
    this.otelSelected.emit(otel);
  }

  onSortChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.sortOtellers(target.value);
  }

  sortOtellers(field: string): void {
    if (this.sortBy === field) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortBy = field;
      this.sortOrder = 'asc';
    }

    this.filteredOteller.sort((a, b) => {
      let aValue: any = a[field as keyof Otel];
      let bValue: any = b[field as keyof Otel];

      // String değerler için
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      // Number değerler için (puan gibi)
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        if (this.sortOrder === 'asc') {
          return aValue - bValue;
        } else {
          return bValue - aValue;
        }
      }

      // String karşılaştırması
      if (this.sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });
  }

  getSortIcon(field: string): string {
    if (this.sortBy !== field) {
      return 'fas fa-sort';
    }
    return this.sortOrder === 'asc' ? 'fas fa-sort-up' : 'fas fa-sort-down';
  }

  get paginatedOtellers(): Otel[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredOteller.slice(startIndex, endIndex);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredOteller.length / this.itemsPerPage);
  }

  get pageNumbers(): number[] {
    const pages: number[] = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, this.currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(this.totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  getStarRating(puan: number | undefined): string[] {
    const stars: string[] = [];
    const rating = puan || 0;
    
    for (let i = 1; i <= 10; i++) {
      if (i <= rating) {
        stars.push('fas fa-star text-warning');
      } else {
        stars.push('far fa-star text-muted');
      }
    }
    
    return stars;
  }

  getOtelImage(otel: Otel): string {
    const resimler = this.otelResimler[otel.id];
    if (resimler && resimler.length > 0) {
      return resimler[0].resimUrl;
    }
    return `https://via.placeholder.com/300x200/007bff/ffffff?text=${encodeURIComponent(otel.otelAdi)}`;
  }

  getCurrentPageEnd(): number {
    return Math.min(this.currentPage * this.itemsPerPage, this.filteredOteller.length);
  }

  goToOtelDetail(otelId: number): void {
    this.router.navigate(['/otel-detay'], { queryParams: { id: otelId } });
  }

  rezervasyonYap(otel: Otel): void {
    const user = this.authService.getCurrentUser();
    if (!user) {
      this.router.navigate(['/kullanici-giris/login']);
      return;
    }
    this.router.navigate(['/rezervasyon/oda', otel.id]);
  }

  onFiltreDegisti(filtreler: FiltreKriterleri): void {
    let filtered = [...this.allOteller];

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

    this.filteredOteller = filtered;
    this.currentPage = 1; // İlk sayfaya dön
  }

  toggleSidebar(): void {
    this.showSidebar = !this.showSidebar;
  }
} 