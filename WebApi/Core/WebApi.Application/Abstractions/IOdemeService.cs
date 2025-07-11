using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using WebApi.Domain.Entities;

namespace WebApi.Application.Abstractions
{
    /// <summary>
    /// Odeme islemleri icin servis arayuzu.
    /// </summary>
    public interface IOdemeService
    {
        /// <summary>
        /// Tum odemeleri getirir.
        /// </summary>
        Task<IEnumerable<Odeme>> TumOdemeleriGetirAsync();

        /// <summary>
        /// Id ile odeme getirir.
        /// </summary>
        Task<Odeme> IdIleOdemeGetirAsync(int id);

        /// <summary>
        /// Yeni odeme kaydi olusturur (odeme islemini gerceklestirir).
        /// </summary>
        Task<Odeme> YeniOdemeKaydiOlusturAsync(Odeme odeme);

        /// <summary>
        /// Var olan odemeyi gunceller.
        /// </summary>
        Task OdemeGuncelleAsync(Odeme odeme);

        /// <summary>
        /// Id ile odeme kaydini siler.
        /// </summary>
        Task OdemeSilAsync(int id);

        /// <summary>
        /// Odeme islemini yurutur (durum guncelleme, rezervasyonu onaylama vs.).
        /// </summary>
        Task OdemeIsleminiYurutAsync(int odemeId);

        /// <summary>
        /// Bir rezervasyona ait odeme kayitlarini getirir.
        /// </summary>
        Task<IEnumerable<Odeme>> RezervasyonaAitOdemeleriGetirAsync(int rezervasyonId);

        /// <summary>
        /// Bir kullanıcıya (AppUserId) ait tüm ödemeleri getirir.
        /// </summary>
        Task<IEnumerable<Odeme>> KullanicininOdemeleriniGetirAsync(string appUserId);
    }
}
