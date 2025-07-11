using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using WebApi.Domain.Entities;

namespace WebApi.Application.Abstractions
{
    /// <summary>
    /// Yonetici islemleri icin servis arayuzu.
    /// </summary>
    public interface IAdminService
    {
        /// <summary>
        /// Tum yoneticileri getirir.
        /// </summary>
        Task<IEnumerable<Admin>> TumAdminleriGetirAsync();

        /// <summary>
        /// Id ile yoneticiyi getirir.
        /// </summary>
        Task<Admin> IdIleAdminiGetirAsync(int id);

        /// <summary>
        /// Yeni yonetici olusturur.
        /// </summary>
        Task<Admin> YeniAdminOlusturAsync(Admin admin);

        /// <summary>
        /// Var olan yoneticiyi gunceller.
        /// </summary>
        Task AdminiGuncelleAsync(Admin admin);

        /// <summary>
        /// Id ile yonetici kaydini siler.
        /// </summary>
        Task AdminiSilAsync(int id);

        /// <summary>
        /// Adminin otelini getirir.
        /// </summary>
        Task<Otel> AdmininOteliniGetirAsync(int adminId);

        /// <summary>
        /// Adminin otellerini getirir.
        /// </summary>
        Task<List<Otel>> AdmininOtelleriniGetirAsync(int adminId);

        /// <summary>
        /// Yonetici kullanici adi ve parola ile kimlik dogrulama yapar.
        /// </summary>
        Task<Admin> KimlikDogrulaAsync(string kullaniciAdi, string parola);

        /// <summary>
        /// Id ile admin şifresini getirir.
        /// </summary>
        Task<string> AdminSifresiGetirAsync(int id);
    }
}
