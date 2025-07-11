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
    public class Odeme : BaseEntity
    {
        [ForeignKey(nameof(Rezervasyon))]
        public int RezervasyonId { get; set; }
        public Rezervasyon Rezervasyon { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal Tutar { get; set; }

        public DateTime OdemeTarihi { get; set; }

        public OdemeYontemi Yontem { get; set; }
        public OdemeDurumu Durum { get; set; }

        public string KartIsim { get; set; }
        public string KartNo { get; set; }
        public string KartSKT { get; set; }
        public string KartCVV { get; set; }
    }
}
