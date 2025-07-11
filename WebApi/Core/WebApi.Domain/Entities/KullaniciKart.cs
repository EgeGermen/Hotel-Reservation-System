using System;

namespace WebApi.Domain.Entities
{
    public class KullaniciKart
    {
        public int Id { get; set; }
        public string KullaniciId { get; set; }
        public string KartIsim { get; set; }
        public string KartNo { get; set; }
        public string KartSKT { get; set; }
        public string KartCVV { get; set; }
    }
} 