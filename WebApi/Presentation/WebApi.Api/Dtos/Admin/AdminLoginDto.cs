using System.ComponentModel.DataAnnotations;

namespace WebApi.Api.Dtos.Admin
{
    public class AdminLoginDto
    {
        [Required, MaxLength(100)]
        public string KullaniciAdi { get; set; }
        [Required, MinLength(4)]
        public string sifre { get; set; }
    }
} 