import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OtelDetayComponent } from './otel-detay/otel-detay.component';
import { RezervasyonOdaComponent } from './rezervasyon-oda/rezervasyon-oda.component';
import { RezervasyonBilgiComponent } from './rezervasyon-bilgi/rezervasyon-bilgi.component';
import { RezervasyonOnayComponent } from './rezervasyon-onay/rezervasyon-onay.component';
import { AnaSayfaComponent } from './ana-sayfa/ana-sayfa.component';
import { KullaniciGirisComponent } from './kullanici-giris/kullanici-giris.component';
import { KullaniciPanelComponent } from './kullanici-panel/kullanici-panel.component';
import { DestekIletisimComponent } from './destek-iletisim/destek-iletisim.component';
import { AyarlarComponent } from './ayarlar/ayarlar.component';
import { KullaniciLoginComponent } from './kullanici-giris/kullanici-login/kullanici-login.component';
import { KullaniciRegisterComponent } from './kullanici-giris/kullanici-register/kullanici-register.component';
import { AdminLoginComponent } from './kullanici-giris/admin-login/admin-login.component';
import { OtelYonetimiComponent } from './admin/otel-yonetimi/otel-yonetimi.component';
import { OtelListeComponent } from './otel-liste/otel-liste.component';
import { AdminGuard } from './guards/admin.guard';
import { UserGuard } from './guards/user.guard';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: AnaSayfaComponent },
  { path: 'otel-detay/:id', component: OtelDetayComponent,   },
  { path: 'rezervasyon/oda/:otelId', component: RezervasyonOdaComponent, canActivate: [UserGuard] },
  { path: 'rezervasyon/bilgi', component: RezervasyonBilgiComponent, canActivate: [UserGuard] },
  { path: 'rezervasyon/onay', component: RezervasyonOnayComponent, canActivate: [UserGuard] },

  { path: 'giris', component: KullaniciGirisComponent },
  { path: 'panel', component: KullaniciPanelComponent },
  { path: 'destek', component: DestekIletisimComponent },
  { path: 'ayarlar', component: AyarlarComponent },

  // Admin routes
  { path: 'admin/otel-yonetimi', component: OtelYonetimiComponent, canActivate: [AdminGuard] },
  
  // Otel listesi route
  { path: 'otel-liste', component: OtelListeComponent },

  { path: 'kullanici-giris', component: KullaniciGirisComponent,
    children: [
      {path: 'login', component: KullaniciLoginComponent},
      {path: 'register', component: KullaniciRegisterComponent},
      {path: 'admin', component: AdminLoginComponent}
    ]
   },
  { path: 'panel', component: KullaniciPanelComponent },
  { path: 'destek', component: DestekIletisimComponent },
  { path: 'ayarlar', component: AyarlarComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
