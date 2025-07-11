using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using WebApi.Domain.Entities;

namespace WebApi.Domain.Entities.Identity
{
    public class AppUser : IdentityUser<string>
    {
        [Required, MaxLength(100)]
        public string AdiSoyadi { get; set; }
        public virtual ICollection<Rezervasyon> Rezervasyonlar { get; set; }
        public virtual ICollection<Odeme> Odemeler { get; set; }
        public AppUser()
        {
            Id = Guid.NewGuid().ToString();
        }
    }
}
