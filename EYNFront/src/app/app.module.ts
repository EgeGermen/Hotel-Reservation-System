import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OtelDetayComponent } from './otel-detay/otel-detay.component';
import { RezervasyonOdaComponent } from './rezervasyon-oda/rezervasyon-oda.component';
import { RezervasyonBilgiComponent } from './rezervasyon-bilgi/rezervasyon-bilgi.component';
import { RezervasyonOnayComponent } from './rezervasyon-onay/rezervasyon-onay.component';
import { AnaSayfaComponent } from './ana-sayfa/ana-sayfa.component';
import { KullaniciPanelComponent } from './kullanici-panel/kullanici-panel.component';
import { DestekIletisimComponent } from './destek-iletisim/destek-iletisim.component';
import { KullaniciGirisComponent } from './kullanici-giris/kullanici-giris.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AyarlarComponent } from './ayarlar/ayarlar.component';
import { UserService } from './services/user.service';
import { KullaniciLoginComponent } from './kullanici-giris/kullanici-login/kullanici-login.component';
import { KullaniciRegisterComponent} from './kullanici-giris/kullanici-register/kullanici-register.component';
import { AdminLoginComponent } from './kullanici-giris/admin-login/admin-login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { OtelFiltreComponent } from './otel-filtre/otel-filtre.component';
import { OtelYonetimiComponent } from './admin/otel-yonetimi/otel-yonetimi.component';
import { OtelListeComponent } from './otel-liste/otel-liste.component';
import { GaleriModalComponent } from './galeri-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    OtelDetayComponent,
    RezervasyonOdaComponent,
    RezervasyonBilgiComponent,
    RezervasyonOnayComponent,
    AnaSayfaComponent,
    KullaniciPanelComponent,
    DestekIletisimComponent,
    KullaniciGirisComponent,
    HeaderComponent,
    FooterComponent,
    AyarlarComponent,
    KullaniciLoginComponent,
    KullaniciRegisterComponent,
    AdminLoginComponent,
    OtelFiltreComponent,
    OtelYonetimiComponent,
    OtelListeComponent,
    GaleriModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
