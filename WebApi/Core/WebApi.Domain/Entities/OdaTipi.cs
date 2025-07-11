using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApi.Domain.Entities.Commen;

namespace WebApi.Domain.Entities
{
    public class OdaTipi : BaseEntity
    {
        [Required, MaxLength(100)]
        public string OdaTipiAdi { get; set; }

        public string Aciklama { get; set; }

        [ForeignKey(nameof(Otel))]
        public int OtelId { get; set; }
        public Otel Otel { get; set; }

        public int Kapasite { get; set; }

        public int OdaSayisi { get; set; } // Yeni eklenen alan

        [Column(TypeName = "decimal(18,2)")]
        public decimal Fiyat { get; set; }

        public ICollection<OdaTipiResim> OdaTipiResimler { get; set; } // Navigation property

        public double?  IndirimOrani { get; set; }
    }
}
