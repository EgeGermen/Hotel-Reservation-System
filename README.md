
# EYN Otel Rezervasyon Sistemi

**Author: Ege Germen**

## Proje Hakkında

EYN Otel Rezervasyon Sistemi, kullanıcıların otel rezervasyonu yapabileceği, otelleri listeleyebileceği, filtreleyebileceği ve otel detaylarını görüntüleyebileceği bir web uygulamasıdır. Proje, modern bir mimari ve teknolojiler kullanılarak geliştirilmiştir.

## Mimariler

### Backend Mimarisi: Onion Architecture

Backend, **Onion Architecture** prensiplerine uygun olarak geliştirilmiştir. Bu mimari, projenin katmanlı bir yapıya sahip olmasını, bağımlılıkların merkeze doğru tek yönlü olmasını ve projenin daha test edilebilir, sürdürülebilir ve ölçeklenebilir olmasını sağlar.

- **Core Katmanı:**
    - **Domain:** Projenin temel iş mantığını ve varlıklarını içerir. Hiçbir katmana bağımlılığı yoktur.
    - **Application:** İş akışlarını, komutları, sorguları ve DTO'ları (Data Transfer Objects) içerir. `MediatR` kütüphanesi ile CQRS (Command Query Responsibility Segregation) deseni uygulanmıştır.
- **Infrastructure Katmanı:**
    - **Persistence:** Veritabanı işlemlerini, Entity Framework Core context'ini ve migration'ları içerir. PostgreSQL veritabanı kullanılmıştır.
    - **Infrastructure:** Token yönetimi gibi altyapısal servisleri içerir.
- **Presentation Katmanı:**
    - **WebApi.Api:** Kullanıcıdan gelen istekleri karşılayan ve cevapları döndüren API controller'larını içerir. Swagger ile API dokümantasyonu sunulmaktadır.

### Frontend Mimarisi: Component-Based Architecture

Frontend, **Angular** ile **Component-Based Architecture** kullanılarak geliştirilmiştir. Bu mimari, arayüzün yeniden kullanılabilir ve yönetilebilir bileşenlere ayrılmasını sağlar.

- **Components:** Arayüzün her bir parçasını temsil eden bileşenlerden oluşur (örneğin, `otel-liste`, `otel-detay`, `rezervasyon-onay`).
- **Services:** API istekleri, kimlik doğrulama ve durum yönetimi gibi iş mantığını içerir.
- **Modules:** Uygulamanın farklı özelliklerini gruplayan modüllerden oluşur.

## Kullanılan Teknolojiler

### Backend

- **.NET 9.0:** Projenin geliştirildiği ana platform.
- **ASP.NET Core:** Web API oluşturmak için kullanılan framework.
- **Entity Framework Core:** Veritabanı işlemleri için kullanılan ORM (Object-Relational Mapping) aracı.
- **PostgreSQL:** Veritabanı olarak kullanılmıştır.
- **MediatR:** CQRS desenini uygulamak için kullanılmıştır.
- **JWT (JSON Web Token):** Kimlik doğrulama ve yetkilendirme için kullanılmıştır.
- **Swagger:** API dokümantasyonu için kullanılmıştır.

### Frontend

- **Angular 18:** Frontend uygulamasının geliştirildiği framework.
- **TypeScript:** JavaScript'in statik tipli bir üst kümesi.
- **RxJS:** Asenkron ve olay tabanlı programlama için kullanılmıştır.
- **SCSS:** CSS'in daha gelişmiş bir versiyonu.

## Kurulum ve Çalıştırma

### Backend

1. **Veritabanı Ayarları:** `WebApi/Presentation/WebApi.Api/appsettings.json` dosyasındaki `ConnectionStrings` bölümünü kendi PostgreSQL veritabanı bilgilerinizle güncelleyin.
2. **Migration'ları Uygulama:** `WebApi.Persistence` projesinin olduğu dizinde aşağıdaki komutu çalıştırarak veritabanı şemasını oluşturun:
   ```bash
   dotnet ef database update
   ```
3. **Uygulamayı Çalıştırma:** `WebApi.Api` projesinin olduğu dizinde aşağıdaki komutu çalıştırın:
   ```bash
   dotnet run
   ```

### Frontend

1. **Bağımlılıkları Yükleme:** `EYNFront` dizininde aşağıdaki komutu çalıştırın:
   ```bash
   npm install
   ```
2. **Uygulamayı Çalıştırma:** `EYNFront` dizininde aşağıdaki komutu çalıştırın:
   ```bash
   ng serve
   ```
Uygulama, `http://localhost:4200/` adresinde çalışacaktır.

## API Dokümantasyonu

Backend uygulaması çalıştırıldığında, Swagger arayüzü üzerinden API dokümantasyonuna erişebilirsiniz. Varsayılan olarak, dokümantasyon `http://localhost:5000/swagger` (veya benzeri bir port) adresinde bulunur.

## Projenin Amacı

Bu proje, staj kapsamında geliştirilmiş olup, modern web geliştirme teknolojilerini ve mimarilerini kullanarak bir otel rezervasyon sistemi oluşturmayı amaçlamaktadır. Proje, hem backend hem de frontend geliştirme süreçlerini kapsayarak, tam bir web uygulaması geliştirme deneyimi sunmaktadır.
