using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using WebApi.Domain.Entities;

namespace WebApi.Application.Abstractions
{
    /// <summary>
    /// OdaTipi islemleri icin servis arayuzu.
    /// </summary>
    public interface IOdaTipiService
    {
        /// <summary>
        /// Tum oda tiplerini getirir.
        /// </summary>
        Task<IEnumerable<OdaTipi>> TumOdaTipleriniGetirAsync();

        /// <summary>
        /// Id ile oda tipini getirir.
        /// </summary>
        Task<OdaTipi> IdIleOdaTipiniGetirAsync(int id);

        /// <summary>
        /// Yeni oda tipini olusturur.
        /// </summary>
        Task<OdaTipi> YeniOdaTipiOlusturAsync(OdaTipi odaTipi);

        /// <summary>
        /// Var olan oda tipini gunceller.
        /// </summary>
        Task OdaTipiGuncelleAsync(OdaTipi odaTipi);

        /// <summary>
        /// Id ile oda tipini siler.
        /// </summary>
        Task OdaTipiSilAsync(int id);

        /// <summary>
        /// Bir otele ait oda tiplerini getirir.
        /// </summary>
        Task<IEnumerable<OdaTipi>> OteleAitOdaTipleriniGetirAsync(int otelId);

        /// <summary>
        /// Tarih araligina gore oda tipi uygun mu kontrol eder.
        /// </summary>
        Task<bool> UygunlukKontroluYapAsync(int odaTipiId, DateTime giris, DateTime cikis);
    }
}
