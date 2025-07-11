using System.ComponentModel.DataAnnotations;

namespace WebApi.Api.Dtos.Otel
{
    public class OtelUpdateDto
    {
        [Required]
        public int Id { get; set; }
        [Required, MaxLength(200)]
        public string OtelAdi { get; set; }
        [Required, MaxLength(100)]
        public string Email { get; set; }
        [MaxLength(20)]
        public string Telefon { get; set; }
        [Required, MaxLength(200)]
        public string AdresSatiri1 { get; set; }
        [Required, MaxLength(100)]
        public string Sehir { get; set; }
        [Required, MaxLength(100)]
        public string Ulke { get; set; }
        public decimal? Puan { get; set; }
        [Required]
        public int AdminId { get; set; }
    }
}