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
    public class Admin : BaseEntity
    {
        [Required, MaxLength(100)]
        public string KullaniciAdi { get; set; }

        [Required]
        public string sifre { get; set; }

        // Bir adminin birden fazla oteli olabilir
        public ICollection<Otel> Oteller { get; set; }
    }
}
