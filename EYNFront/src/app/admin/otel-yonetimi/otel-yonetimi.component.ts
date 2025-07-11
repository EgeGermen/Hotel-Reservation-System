import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OtelService } from '../../services/otel.services';
import { AdminService } from '../../services/admin.services';
import { Otel, OtelCreate, OtelUpdate, Admin } from '../../models';
import { OdaTipiService } from '../../services/oda-tipi.services';
import { OdaTipiCreate, OdaTipi, OdaTipiUpdate } from '../../models/oda-tipi.model';
import { OtelResim } from '../../models/otel-resim.model';
import { OtelResimService } from '../../services/otel-resim.services';
import { OdaTipiResim } from '../../models/oda-tipi-resim.model';
import { OdaTipiResimService } from '../../services/oda-tipi-resim.services';

@Component({
  selector: 'app-otel-yonetimi',
  templateUrl: './otel-yonetimi.component.html',
  styleUrls: ['./otel-yonetimi.component.scss']
})
export class OtelYonetimiComponent implements OnInit {
  oteller: Otel[] = [];
  otelForm: FormGroup;
  isEditing = false;
  selectedOtelId: number | null = null;
  loading = false;
  errorMessage = '';
  successMessage = '';
  showForm = false; // Form görünürlüğü için
  currentAdmin: Admin | null = null;
  odaTipiForm: FormGroup;
  odaTipiFormVisible: { [otelId: number]: boolean } = {};
  odaTipiLoading: { [otelId: number]: boolean } = {};
  odaTipiError: { [otelId: number]: string } = {};
  odaTipiSuccess: { [otelId: number]: string } = {};
  odaTipleri: { [otelId: number]: OdaTipi[] } = {};
  odaTipleriVisible: { [otelId: number]: boolean } = {};
  odaTipiEditId: { [otelId: number]: number | null } = {};
  odaTipiEditForm: FormGroup;
  odaTipiEditLoading: { [odaTipiId: number]: boolean } = {};
  odaTipiEditError: { [odaTipiId: number]: string } = {};
  otelResimler: { [otelId: number]: OtelResim[] } = {};
  otelResimUrl: { [otelId: number]: string } = {};
  otelResimLoading: { [otelId: number]: boolean } = {};
  otelResimError: { [otelId: number]: string } = {};
  odaTipiResimler: { [odaTipiId: number]: OdaTipiResim[] } = {};
  odaTipiResimUrl: { [odaTipiId: number]: string } = {};
  odaTipiResimLoading: { [odaTipiId: number]: boolean } = {};
  odaTipiResimError: { [odaTipiId: number]: string } = {};
  
  

  constructor(
    private otelService: OtelService,
    private adminService: AdminService,
    private odaTipiService: OdaTipiService,
    private otelResimService: OtelResimService,
    private odaTipiResimService: OdaTipiResimService,
    private fb: FormBuilder
  ) {
    this.otelForm = this.fb.group({
      otelAdi: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      telefon: ['', [Validators.required, Validators.pattern(/^[0-9+\-\s()]+$/)]],
      adresSatiri1: ['', [Validators.required, Validators.minLength(10)]],
      sehir: ['', [Validators.required, Validators.minLength(2)]],
      ulke: ['', [Validators.required, Validators.minLength(2)]],
      puan: [null, [Validators.min(0), Validators.max(10)]]
    });
    this.odaTipiForm = this.fb.group({
      odaTipiAdi: ['', [Validators.required, Validators.minLength(2)]],
      aciklama: [''],
      kapasite: [1, [Validators.required, Validators.min(1)]],
      fiyat: [0, [Validators.required, Validators.min(0)]],
      odaSayisi: [1, [Validators.required, Validators.min(1)]],
      indirimOrani: [0] 

    });
    this.odaTipiEditForm = this.fb.group({
      odaTipiAdi: ['', [Validators.required, Validators.minLength(2)]],
      aciklama: [''],
      kapasite: [1, [Validators.required, Validators.min(1)]],
      fiyat: [0, [Validators.required, Validators.min(0)]],
      odaSayisi: [1, [Validators.required, Validators.min(1)]],
      indirimOrani: [0] 

    });
  }

  ngOnInit(): void {
    this.getCurrentAdmin();
  }

  getCurrentAdmin(): void {
    const adminData = localStorage.getItem('currentAdmin');
    if (adminData) {
      this.currentAdmin = JSON.parse(adminData);
      this.loadOteller();
    } else {
      this.errorMessage = 'Admin bilgisi bulunamadı. Lütfen tekrar giriş yapın.';
    }
  }

  loadOteller(): void {
    if (!this.currentAdmin) {
      this.errorMessage = 'Admin bilgisi bulunamadı.';
      return;
    }

    this.loading = true;
    this.adminService.getOtellerByAdmin(this.currentAdmin.id).subscribe({
      next: (oteller) => {
        this.oteller = oteller;
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = 'Oteller yüklenirken hata oluştu: ' + error.message;
        this.loading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.otelForm.valid) {
      this.loading = true;
      const formValue = this.otelForm.value;

      if (this.isEditing && this.selectedOtelId) {
        // Güncelleme işlemi
        const updateData: OtelUpdate = {
          id: this.selectedOtelId,
          ...formValue,
          puan: formValue.puan || null,
          adminId: this.currentAdmin!.id
        };

        this.otelService.update(this.selectedOtelId, updateData).subscribe({
          next: () => {
            this.successMessage = 'Otel başarıyla güncellendi!';
            this.resetForm();
            this.loadOteller();
            this.loading = false;
          },
          error: (error) => {
            this.errorMessage = 'Otel güncellenirken hata oluştu: ' + error.message;
            this.loading = false;
          }
        });
      } else {
        // Yeni otel ekleme
        const createData: OtelCreate = {
          ...formValue,
          adminId: this.currentAdmin!.id
        };

        this.otelService.create(createData).subscribe({
          next: () => {
            this.successMessage = 'Otel başarıyla eklendi!';
            this.resetForm();
            this.loadOteller();
            this.loading = false;
          },
          error: (error) => {
            this.errorMessage = 'Otel eklenirken hata oluştu: ' + error.message;
            this.loading = false;
          }
        });
      }
    }
  }

  editOtel(otel: Otel): void {
    this.isEditing = true;
    this.selectedOtelId = otel.id;
    this.showForm = true; // Formu göster
    this.otelForm.patchValue({
      otelAdi: otel.otelAdi,
      email: otel.email,
      telefon: otel.telefon,
      adresSatiri1: otel.adresSatiri1,
      sehir: otel.sehir,
      ulke: otel.ulke,
      puan: otel.puan || null
    });
    this.loadOtelResimler(otel.id);
  }

  deleteOtel(id: number): void {
    if (confirm('Bu oteli silmek istediğinizden emin misiniz?')) {
      this.loading = true;
      this.otelService.delete(id).subscribe({
        next: () => {
          this.successMessage = 'Otel başarıyla silindi!';
          this.loadOteller();
          this.loading = false;
        },
        error: (error) => {
          this.errorMessage = 'Otel silinirken hata oluştu: ' + error.message;
          this.loading = false;
        }
      });
    }
  }

  resetForm(): void {
    this.otelForm.reset();
    this.isEditing = false;
    if (this.selectedOtelId) {
      this.otelResimler[this.selectedOtelId] = [];
    }
    this.selectedOtelId = null;
    this.errorMessage = '';
    this.successMessage = '';
    this.showForm = false;
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
    if (!this.showForm) {
      this.resetForm();
    }
  }

  clearMessages(): void {
    this.errorMessage = '';
    this.successMessage = '';
  }

  toggleOdaTipiForm(otelId: number): void {
    this.odaTipiFormVisible[otelId] = !this.odaTipiFormVisible[otelId];
    this.odaTipiError[otelId] = '';
    this.odaTipiSuccess[otelId] = '';
    this.odaTipiForm.reset({ odaTipiAdi: '', aciklama: '', kapasite: 1, fiyat: 0, odaSayisi: 1 });
  }

  odaTipiEkle(otelId: number): void {
    if (this.odaTipiForm.invalid) return;
    this.odaTipiLoading[otelId] = true;
    this.odaTipiError[otelId] = '';
    this.odaTipiSuccess[otelId] = '';
    const odaTipi: OdaTipiCreate = {
      ...this.odaTipiForm.value,
      otelId: otelId
    };
    this.odaTipiService.create(odaTipi).subscribe({
      next: () => {
        this.odaTipiSuccess[otelId] = 'Oda tipi başarıyla eklendi!';
        this.odaTipiForm.reset({ odaTipiAdi: '', aciklama: '', kapasite: 1, fiyat: 0, odaSayisi: 1 });
        this.odaTipiLoading[otelId] = false;
      },
      error: (err) => {
        this.odaTipiError[otelId] = 'Oda tipi eklenirken hata oluştu: ' + (err?.message || '');
        this.odaTipiLoading[otelId] = false;
      }
    });
  }

  toggleOdaTipleri(otelId: number): void {
    this.odaTipleriVisible[otelId] = !this.odaTipleriVisible[otelId];
    if (this.odaTipleriVisible[otelId]) {
      this.odaTipiService.getByOtel(otelId).subscribe(odaTipleri => {
        this.odaTipleri[otelId] = odaTipleri;
        // Oda tiplerinin resimlerini de yükle
        odaTipleri.forEach(oda => this.loadOdaTipiResimler(oda.id));
      });
    }
  }

  startEditOdaTipi(otelId: number, oda: OdaTipi): void {
    this.odaTipiEditId[otelId] = oda.id;
    this.odaTipiEditForm.setValue({
      odaTipiAdi: oda.odaTipiAdi,
      aciklama: oda.aciklama || '',
      kapasite: oda.kapasite,
      fiyat: oda.fiyat,
      odaSayisi: oda.odaSayisi || 1,
      indirimOrani: oda.indirimOrani || 0
    });
    this.odaTipiEditError[oda.id] = '';
    this.loadOdaTipiResimler(oda.id);
  }

  cancelEditOdaTipi(otelId: number): void {
    this.odaTipiEditId[otelId] = null;
    this.odaTipiEditForm.reset();
  }

  saveEditOdaTipi(otelId: number, oda: OdaTipi): void {
    if (this.odaTipiEditForm.invalid) return;
    this.odaTipiEditLoading[oda.id] = true;
    this.odaTipiEditError[oda.id] = '';
    const update: OdaTipiUpdate = {
      ...this.odaTipiEditForm.value,
      id: oda.id,
      otelId: otelId
    };
    this.odaTipiService.update(oda.id, update).subscribe({
      next: () => {
        this.odaTipiEditLoading[oda.id] = false;
        this.odaTipiEditId[otelId] = null;
        this.toggleOdaTipleri(otelId); // Yeniden yükle
        this.odaTipiService.getByOtel(otelId).subscribe(odaTipleri => {
          this.odaTipleri[otelId] = odaTipleri;
          odaTipleri.forEach(oda => this.loadOdaTipiResimler(oda.id));
        });
      },
      error: (err) => {
        this.odaTipiEditError[oda.id] = 'Güncelleme hatası: ' + (err?.message || '');
        this.odaTipiEditLoading[oda.id] = false;
      }
    });
  }

  deleteOdaTipi(otelId: number, odaTipiId: number): void {
    if (!confirm('Bu oda tipini silmek istediğinizden emin misiniz?')) return;
    this.odaTipiService.delete(odaTipiId).subscribe(() => {
      this.odaTipleri[otelId] = this.odaTipleri[otelId].filter(o => o.id !== odaTipiId);
    });
  }

  loadOtelResimler(otelId: number): void {
    this.otelResimService.getByOtelId(otelId).subscribe({
      next: (resimler) => {
        this.otelResimler[otelId] = resimler;
      },
      error: () => {
        this.otelResimError[otelId] = 'Resimler yüklenemedi.';
      }
    });
  }

  addOtelResim(otelId: number): void {
    const url = this.otelResimUrl[otelId];
    if (!url) return;
    this.otelResimLoading[otelId] = true;
    this.otelResimService.add({ otelId, resimUrl: url }).subscribe({
      next: (resim) => {
        if (!this.otelResimler[otelId]) this.otelResimler[otelId] = [];
        this.otelResimler[otelId].push(resim);
        this.otelResimUrl[otelId] = '';
        this.otelResimLoading[otelId] = false;
      },
      error: () => {
        this.otelResimError[otelId] = 'Resim eklenemedi.';
        this.otelResimLoading[otelId] = false;
      }
    });
  }

  deleteOtelResim(otelId: number, resimId: number): void {
    this.otelResimService.delete(resimId).subscribe(() => {
      this.otelResimler[otelId] = this.otelResimler[otelId].filter(r => r.id !== resimId);
    });
  }

  loadOdaTipiResimler(odaTipiId: number): void {
    this.odaTipiResimService.getByOdaTipiId(odaTipiId).subscribe({
      next: (resimler) => {
        this.odaTipiResimler[odaTipiId] = resimler;
      },
      error: () => {
        this.odaTipiResimError[odaTipiId] = 'Resimler yüklenemedi.';
      }
    });
  }

  addOdaTipiResim(odaTipiId: number): void {
    const url = this.odaTipiResimUrl[odaTipiId];
    if (!url) return;
    this.odaTipiResimLoading[odaTipiId] = true;
    this.odaTipiResimService.add({ odaTipiId, resimUrl: url }).subscribe({
      next: (resim) => {
        if (!this.odaTipiResimler[odaTipiId]) this.odaTipiResimler[odaTipiId] = [];
        this.odaTipiResimler[odaTipiId].push(resim);
        this.odaTipiResimUrl[odaTipiId] = '';
        this.odaTipiResimLoading[odaTipiId] = false;
      },
      error: () => {
        this.odaTipiResimError[odaTipiId] = 'Resim eklenemedi.';
        this.odaTipiResimLoading[odaTipiId] = false;
      }
    });
  }

  deleteOdaTipiResim(odaTipiId: number, resimId: number): void {
    this.odaTipiResimService.delete(resimId).subscribe(() => {
      this.odaTipiResimler[odaTipiId] = this.odaTipiResimler[odaTipiId].filter(r => r.id !== resimId);
    });
  }
}
