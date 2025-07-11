using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using WebApi.Domain.Entities;

namespace WebApi.Application.Abstractions
{
    /// <summary>
    /// Rezervasyon islemleri icin servis arayuzu.
    /// </summary>
    public interface IRezervasyonService
    {
        /// <summary>
        /// Tum rezervasyonlari getirir.
        /// </summary>
        Task<IEnumerable<Rezervasyon>> TumRezervasyonlariGetirAsync();

        /// <summary>
        /// Id ile rezervasyon getirir.
        /// </summary>
        Task<Rezervasyon> IdIleRezervasyonGetirAsync(int id);

        /// <summary>
        /// Yeni rezervasyon olusturur (once uygunluk kontrolu yapilabilir).
        /// </summary>
        Task<Rezervasyon> YeniRezervasyonOlusturAsync(Rezervasyon rezervasyon);

        /// <summary>
        /// Var olan rezervasyonu gunceller.
        /// </summary>
        Task RezervasyonGuncelleAsync(Rezervasyon rezervasyon);

        /// <summary>
        /// Id ile rezervasyonu siler veya iptal eder.
        /// </summary>
        Task RezervasyonSilAsync(int id);

        /// <summary>
        /// Oda tipi ve tarih araligina gore uygunluk kontrolu yapar.
        /// </summary>
        Task<bool> UygunlukKontroluYapAsync(int odaTipiId, DateTime giris, DateTime cikis);

        /// <summary>
        /// Rezervasyonu onaylar (durumunu gunceller).
        /// </summary>
        Task RezervasyonuOnaylaAsync(int id);

        /// <summary>
        /// Rezervasyonu iptal eder.
        /// </summary>
        Task RezervasyonuIptalEtAsync(int id);

        /// <summary>
        /// Bir kullanıcının (AppUser) tüm rezervasyonlarını getirir.
        /// </summary>
        Task<IEnumerable<Rezervasyon>> MusterininRezervasyonlariniGetirAsync(string appUserId);
    }
}
