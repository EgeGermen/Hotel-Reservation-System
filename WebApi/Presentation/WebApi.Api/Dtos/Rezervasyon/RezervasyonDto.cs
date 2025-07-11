using System;
using System.Collections.Generic;

namespace WebApi.Api.Dtos.Rezervasyon
{
    public class RezervasyonDto
    {
        public int Id { get; set; }
        public string AppUserId { get; set; }
        public int OdaTipiId { get; set; }
        public DateTime GirisTarihi { get; set; }
        public DateTime CikisTarihi { get; set; }
        public DateTime RezervasyonTarihi { get; set; }
        public string Durum { get; set; }
        public decimal ToplamUcret { get; set; }

        public int? OtelId { get; set; }
        public string? OtelAdi { get; set; }
    }
} 