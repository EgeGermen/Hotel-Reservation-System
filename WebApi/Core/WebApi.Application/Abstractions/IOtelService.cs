using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using WebApi.Domain.Entities;

namespace WebApi.Application.Abstractions
{
    /// <summary>
    /// Otel islemleri icin servis arayuzu.
    /// </summary>
    public interface IOtelService
    {
        /// <summary>
        /// Tum otelleri getirir.
        /// </summary>
        Task<IEnumerable<Otel>> TumOtelleriGetirAsync();

        /// <summary>
        /// Id ile otel getirir.
        /// </summary>
        Task<Otel> IdIleOtelGetirAsync(int id);

        /// <summary>
        /// Yeni otel olusturur.
        /// </summary>
        Task<Otel> YeniOtelOlusturAsync(Otel otel);

        /// <summary>
        /// Var olan oteli gunceller.
        /// </summary>
        Task OtelGuncelleAsync(Otel otel);

        /// <summary>
        /// Id ile oteli siler.
        /// </summary>
        Task OtelSilAsync(int id);

        /// <summary>
        /// Bir otelin oda tiplerini getirir.
        /// </summary>
        Task<IEnumerable<OdaTipi>> OtelinOdaTipleriniGetirAsync(int otelId);
    }
}
