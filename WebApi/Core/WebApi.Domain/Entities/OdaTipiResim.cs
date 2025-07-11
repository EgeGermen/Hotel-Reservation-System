using System.ComponentModel.DataAnnotations.Schema;

namespace WebApi.Domain.Entities
{
    public class OdaTipiResim
    {
        public int Id { get; set; }
        public int OdaTipiId { get; set; }
        public string ResimUrl { get; set; }
        public OdaTipi OdaTipi { get; set; }
    }
} 