using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApi.Domain.Entities.Commen;
using WebApi.Domain.Entities.Enum;
using WebApi.Domain.Entities;

namespace WebApi.Domain.Entities
{
    public class Otel : BaseEntity
    {
        // [Key] ile OtelId kaldırıldı, sadece Id kullanılacak
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

        public int AdminId { get; set; } // Hangi admin'e ait
        public Admin Admin { get; set; } // Navigation property

        public int OdaSayisi { get; set; } // Yeni eklenen alan


        // EKLENECEK
        public int? OtelId { get; set; }



        public ICollection<OtelResim> OtelResimler { get; set; } // Navigation property

        public ICollection<OdaTipi> OdaTipleri { get; set; }
    }
}
