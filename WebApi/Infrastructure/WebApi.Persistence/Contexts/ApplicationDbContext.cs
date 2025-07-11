using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApi.Domain.Entities;

namespace WebApi.Persistence.Contexts
{
    //Add-Migration mig_1
    //Update-Database

    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> opts)
          : base(opts) { }

        public DbSet<Otel> Oteller { get; set; }
        public DbSet<Admin> Admins { get; set; }
        public DbSet<OdaTipi> OdaTipleri { get; set; }
        public DbSet<Rezervasyon> Rezervasyonlar { get; set; }
        public DbSet<Odeme> Odemeler { get; set; }
        public DbSet<OtelResim> OtelResimler { get; set; }
        public DbSet<OdaTipiResim> OdaTipiResimler { get; set; }
        public DbSet<KullaniciKart> KullaniciKartlar { get; set; }

        protected override void OnModelCreating(ModelBuilder mb)
        {
            base.OnModelCreating(mb);
            // 1:N Admin–Otel
            mb.Entity<Otel>()
              .HasOne(o => o.Admin)
              .WithMany(a => a.Oteller)
              .HasForeignKey(o => o.AdminId)
              .OnDelete(DeleteBehavior.Cascade);
            // 1:N Otel–OdaTipi
            mb.Entity<OdaTipi>()
              .HasOne(ot => ot.Otel)
              .WithMany(o => o.OdaTipleri)
              .HasForeignKey(ot => ot.OtelId);
            // 1:N AppUser–Rezervasyon
            mb.Entity<Rezervasyon>()
              .HasOne(r => r.AppUser)
              .WithMany(u => u.Rezervasyonlar)
              .HasForeignKey(r => r.AppUserId);
            // 1:N OdaTipi–Rezervasyon
            mb.Entity<Rezervasyon>()
              .HasOne(r => r.OdaTipi)
              .WithMany()
              .HasForeignKey(r => r.OdaTipiId);
            // 1:N Rezervasyon–Odeme
            mb.Entity<Odeme>()
              .HasOne(p => p.Rezervasyon)
              .WithMany(r => r.Odemeler)
              .HasForeignKey(p => p.RezervasyonId);
            // 1:N Otel-OtelResim
            mb.Entity<OtelResim>()
              .HasOne(or => or.Otel)
              .WithMany(o => o.OtelResimler)
              .HasForeignKey(or => or.OtelId);
            // 1:N OdaTipi-OdaTipiResim
            mb.Entity<OdaTipiResim>()
              .HasOne(otr => otr.OdaTipi)
              .WithMany(ot => ot.OdaTipiResimler)
              .HasForeignKey(otr => otr.OdaTipiId);
        }
    }



}
