using System;
using System.ComponentModel.DataAnnotations;

namespace WebApi.Api.Dtos.Rezervasyon
{
    public class RezervasyonUpdateDto
    {
        [Required]
        public int Id { get; set; }
        public string AppUserId { get; set; }
        [Required]
        public int OdaTipiId { get; set; }
        [Required]
        public DateTime GirisTarihi { get; set; }
        [Required]
        public DateTime CikisTarihi { get; set; }
        public decimal? ToplamUcret { get; set; }
    }
} 