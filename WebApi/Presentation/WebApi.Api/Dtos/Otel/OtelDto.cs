using System.Collections.Generic;

namespace WebApi.Api.Dtos.Otel
{
    public class OtelDto
    {
        public int Id { get; set; }
        public string OtelAdi { get; set; }
        public string Email { get; set; }
        public string Telefon { get; set; }
        public string AdresSatiri1 { get; set; }
        public string Sehir { get; set; }
        public string Ulke { get; set; }
        public decimal? Puan { get; set; }

    }
} 