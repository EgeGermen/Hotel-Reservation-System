using System.ComponentModel.DataAnnotations;

namespace WebApi.Api.Dtos.OdaTipi
{
    public class OdaTipiUpdateDto
    {
        [Required]
        public int Id { get; set; }
        [Required, MaxLength(100)]
        public string OdaTipiAdi { get; set; }
        public string Aciklama { get; set; }
        [Required]
        public int OtelId { get; set; }
        [Required]
        public int Kapasite { get; set; }
        [Required]
        public decimal Fiyat { get; set; }
        public double? IndirimOrani { get; set; }

    }
} 