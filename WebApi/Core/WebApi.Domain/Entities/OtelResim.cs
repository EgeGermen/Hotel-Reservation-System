using System.ComponentModel.DataAnnotations.Schema;

namespace WebApi.Domain.Entities
{
    public class OtelResim
    {
        public int Id { get; set; }
        public int OtelId { get; set; }
        public string ResimUrl { get; set; }
        public Otel Otel { get; set; }
    }
} 