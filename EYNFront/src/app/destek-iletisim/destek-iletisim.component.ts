import { Component } from '@angular/core';

@Component({
  selector: 'app-destek-iletisim',
  templateUrl: './destek-iletisim.component.html',
  styleUrl: './destek-iletisim.component.scss'
})
export class DestekIletisimComponent {
  adSoyad: string = '';
  email: string = '';
  mesaj: string = '';
  gonderildi: boolean = false;

  onSubmit(form: any) {
    if (this.adSoyad && this.email && this.mesaj) {
      this.gonderildi = true;
      this.adSoyad = '';
      this.email = '';
      this.mesaj = '';
      form.resetForm();
      setTimeout(() => {
        this.gonderildi = false;
      }, 3000);
    }
  }
}
