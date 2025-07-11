# API Entegrasyonu - Frontend Servisleri

Bu dosya, WebApi backend'i ile Angular frontend arasındaki entegrasyonu açıklar.

## Base URL
```
https://localhost:7155/api
```

## Mevcut Endpoint'ler

### 1. Admin Controller (`/api/admin`)
- `GET /` - Tüm adminleri getir
- `GET /{id}` - ID ile admin getir
- `POST /` - Yeni admin oluştur
- `PUT /{id}` - Admin güncelle
- `DELETE /{id}` - Admin sil
- `POST /authenticate` - Admin kimlik doğrulama
- `GET /otel/{id}` - Otel ID'sine göre admin getir
- `GET /{adminId}/oteller` - Admin'in otellerini getir
- `GET /{id}/sifre` - Admin şifresini getir

### 2. Otel Controller (`/api/otel`)
- `GET /` - Tüm otelleri getir
- `GET /{id}` - ID ile otel getir
- `POST /` - Yeni otel oluştur
- `PUT /{id}` - Otel güncelle
- `DELETE /{id}` - Otel sil
- `GET /{id}/odaTipleri` - Otelin oda tiplerini getir
- `GET /{id}/admin` - Otelin adminini getir

### 3. OdaTipi Controller (`/api/odatipi`)
- `GET /` - Tüm oda tiplerini getir
- `GET /{id}` - ID ile oda tipi getir
- `POST /` - Yeni oda tipi oluştur
- `PUT /{id}` - Oda tipi güncelle
- `DELETE /{id}` - Oda tipi sil
- `GET /otel/{otelId}` - Otel ID'sine göre oda tiplerini getir
- `GET /availability` - Uygunluk kontrolü

### 4. Rezervasyon Controller (`/api/rezervasyon`)
- `GET /` - Tüm rezervasyonları getir
- `GET /{id}` - ID ile rezervasyon getir
- `POST /` - Yeni rezervasyon oluştur
- `PUT /{id}` - Rezervasyon güncelle
- `DELETE /{id}` - Rezervasyon sil
- `GET /check` - Uygunluk kontrolü
- `POST /{id}/confirm` - Rezervasyon onayla
- `POST /{id}/cancel` - Rezervasyon iptal et
- `GET /kullanici/{appUserId}` - Kullanıcının rezervasyonlarını getir

### 5. Odeme Controller (`/api/odeme`)
- `GET /` - Tüm ödemeleri getir
- `GET /{id}` - ID ile ödeme getir
- `POST /` - Yeni ödeme oluştur
- `PUT /{id}` - Ödeme güncelle
- `DELETE /{id}` - Ödeme sil
- `POST /{id}/process` - Ödeme işlemini yürüt
- `GET /rezervasyon/{rezId}` - Rezervasyona ait ödemeleri getir

### 6. Users Controller (`/api/users`)
- `GET /` - Tüm kullanıcıları getir
- `GET /{id}` - ID ile kullanıcı getir
- `POST /` - Yeni kullanıcı oluştur
- `PUT /{id}` - Kullanıcı güncelle
- `DELETE /{id}` - Kullanıcı sil
- `GET /{id}/reservations` - Kullanıcının rezervasyonlarını getir
- `GET /{id}/payments` - Kullanıcının ödemelerini getir
- `POST /{id}/changepassword` - Şifre değiştir
- `GET /{id}/settings` - Kullanıcı ayarlarını getir
- `PUT /{id}/settings` - Kullanıcı ayarlarını güncelle

## Enum Değerleri

### Rezervasyon Durumu
```typescript
enum RezervasyonDurumu {
  Onaylandi = 'Onaylandi',
  IptalEdildi = 'IptalEdildi',
  Tamamlandi = 'Tamamlandi'
}
```

### Ödeme Yöntemi
```typescript
enum OdemeYontemi {
  KrediKart = 'KrediKart',
  Nakit = 'Nakit',
  Online = 'Online'
}
```

### Ödeme Durumu
```typescript
enum OdemeDurumu {
  Beklemede = 'Beklemede',
  Odendi = 'Odendi',
  Basarisiz = 'Basarisiz'
}
```

### Oda Tipi
```typescript
enum OdaTipiEnum {
  Standart = 'Standart',
  Suit = 'Suit',
  Deluxe = 'Deluxe',
  Ekonomik = 'Ekonomik'
}
```

## Kullanım Örnekleri

### Component'te Servis Kullanımı

```typescript
import { Component, OnInit } from '@angular/core';
import { OtelService, Otel } from '../services';

@Component({
  selector: 'app-otel-list',
  template: '...'
})
export class OtelListComponent implements OnInit {
  oteller: Otel[] = [];

  constructor(private otelService: OtelService) {}

  ngOnInit() {
    this.loadOteller();
  }

  loadOteller() {
    this.otelService.getAll().subscribe({
      next: (data) => {
        this.oteller = data;
      },
      error: (error) => {
        console.error('Oteller yüklenirken hata:', error);
      }
    });
  }

  createOtel(otel: any) {
    this.otelService.create(otel).subscribe({
      next: (data) => {
        console.log('Otel oluşturuldu:', data);
        this.loadOteller(); // Listeyi yenile
      },
      error: (error) => {
        console.error('Otel oluşturulurken hata:', error);
      }
    });
  }
}
```

### Model Kullanımı

```typescript
import { Otel, OtelCreate, RezervasyonDurumu, OdemeYontemi } from '../models';

// Otel listesi
const oteller: Otel[] = [];

// Yeni otel oluşturma
const yeniOtel: OtelCreate = {
  otelAdi: 'Grand Hotel',
  email: 'info@grandhotel.com',
  telefon: '+90 212 123 45 67',
  adresSatiri1: 'Taksim Meydanı No:1',
  sehir: 'İstanbul',
  ulke: 'Türkiye',
  puan: 4.5,
  adminId: 1
};

// Kullanıcı oluşturma (CreateUserCommandRequest formatında)
const yeniKullanici = {
  kayitAd: 'John Doe',
  kayitEmail: 'john@example.com',
  kayitSifre: '123456',
  kayitSifreTekrar: '123456'
};

// Rezervasyon durumu kullanımı
const rezervasyonDurumu = RezervasyonDurumu.Onaylandi;

// Ödeme yöntemi kullanımı
const odemeYontemi = OdemeYontemi.KrediKart;
```

## Önemli Notlar

1. **CORS**: Backend'de CORS ayarlarının doğru yapılandırıldığından emin olun.
2. **HTTP Interceptor**: Gerekirse authentication token'ları için HTTP interceptor kullanın.
3. **Error Handling**: Tüm servis çağrılarında error handling yapın.
4. **Loading States**: Kullanıcı deneyimi için loading state'leri ekleyin.
5. **Type Safety**: TypeScript interface'lerini kullanarak type safety sağlayın.
6. **Enum Kullanımı**: String yerine enum değerlerini kullanarak type safety sağlayın.

## Dosya Yapısı

```
src/app/
├── models/
│   ├── index.ts
│   ├── admin.model.ts
│   ├── otel.model.ts
│   ├── oda-tipi.model.ts
│   ├── rezervasyon.model.ts
│   ├── odeme.model.ts
│   ├── user.model.ts
│   ├── base-entity.model.ts
│   └── enums.model.ts
├── services/
│   ├── index.ts
│   ├── api.config.ts
│   ├── admin.services.ts
│   ├── otel.services.ts
│   ├── oda-tipi.services.ts
│   ├── rezervasyon.services.ts
│   ├── odeme.services.ts
│   ├── user.service.ts
│   └── base-entity.services.ts
```

## Kurulum

1. `app.module.ts` dosyasında `HttpClientModule`'ü import edin:

```typescript
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    // ... diğer imports
    HttpClientModule
  ],
  // ...
})
export class AppModule { }
```

2. Component'lerde servisleri inject edin ve kullanın. 