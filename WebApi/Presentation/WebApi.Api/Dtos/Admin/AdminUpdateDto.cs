using System.ComponentModel.DataAnnotations;

namespace WebApi.Api.Dtos.Admin
{
    public class AdminUpdateDto
    {
        [Required]
        public int Id { get; set; }
        [Required, MaxLength(100)]
        public string KullaniciAdi { get; set; }
        public string sifre { get; set; }
    }
} 