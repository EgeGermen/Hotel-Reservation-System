using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApi.Domain.Entities.Commen;
using WebApi.Domain.Entities.Enum;

namespace WebApi.Domain.Entities
{
    public class Rezervasyon : BaseEntity
    {
        [ForeignKey(nameof(AppUser))]
        public string AppUserId { get; set; }
        public virtual WebApi.Domain.Entities.Identity.AppUser AppUser { get; set; }

        [ForeignKey(nameof(OdaTipi))]
        public int OdaTipiId { get; set; }
        public OdaTipi OdaTipi { get; set; }

        public DateTime GirisTarihi { get; set; }
        public DateTime CikisTarihi { get; set; }
        public DateTime RezervasyonTarihi { get; set; }

        public RezervasyonDurumu Durum { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal ToplamUcret { get; set; }

        public ICollection<Odeme> Odemeler { get; set; }
    }
}
