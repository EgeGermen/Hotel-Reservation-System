using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApi.Application.Abstractions;
using WebApi.Domain.Entities;
using WebApi.Domain.Entities.Enum;
using WebApi.Persistence.Contexts;

namespace WebApi.Persistence.Concretes
{
    public class RezervasyonService : IRezervasyonService
    {
        private readonly ApplicationDbContext _context;

        public RezervasyonService(ApplicationDbContext context)
            => _context = context;

        public async Task<IEnumerable<Rezervasyon>> TumRezervasyonlariGetirAsync()
            => await _context.Rezervasyonlar
                .Include(r => r.AppUser)
                .Include(r => r.OdaTipi)
                .ToListAsync();

        public async Task<Rezervasyon> IdIleRezervasyonGetirAsync(int id)
            => await _context.Rezervasyonlar
                .Include(r => r.AppUser)
                .Include(r => r.OdaTipi)
                .FirstOrDefaultAsync(r => r.Id == id);

        public async Task<Rezervasyon> YeniRezervasyonOlusturAsync(Rezervasyon rezervasyon)
        {
            await _context.Rezervasyonlar.AddAsync(rezervasyon);
            await _context.SaveChangesAsync();
            return rezervasyon;
        }

        public async Task RezervasyonGuncelleAsync(Rezervasyon rezervasyon)
        {
            _context.Rezervasyonlar.Update(rezervasyon);
            await _context.SaveChangesAsync();
        }

        public async Task RezervasyonSilAsync(int id)
        {
            var r = await _context.Rezervasyonlar.FindAsync(id);
            if (r != null)
            {
                _context.Rezervasyonlar.Remove(r);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<bool> UygunlukKontroluYapAsync(int odaTipiId, DateTime giris, DateTime cikis)
        {
            var kesisen = await _context.Rezervasyonlar.CountAsync(r =>
                r.OdaTipiId == odaTipiId &&
                r.GirisTarihi < cikis &&
                r.CikisTarihi > giris &&
                r.Durum == RezervasyonDurumu.Onaylandi);
            return kesisen == 0;
        }

        public async Task RezervasyonuOnaylaAsync(int id)
        {
            var r = await _context.Rezervasyonlar.FindAsync(id);
            if (r != null)
            {
                r.Durum = RezervasyonDurumu.Onaylandi;
                await _context.SaveChangesAsync();
            }
        }

        public async Task RezervasyonuIptalEtAsync(int id)
        {
            var r = await _context.Rezervasyonlar.FindAsync(id);
            if (r != null)
            {
                r.Durum = RezervasyonDurumu.IptalEdildi;
                await _context.SaveChangesAsync();
            }
        }

        public async Task<IEnumerable<Rezervasyon>> MusterininRezervasyonlariniGetirAsync(string appUserId)
     => await _context.Rezervasyonlar
         .Include(r => r.OdaTipi)                 // OdaTipi'yi dahil et
             .ThenInclude(ot => ot.Otel)         // OdaTipi üzerinden Otel'i dahil et
         .Where(r => r.AppUserId == appUserId)
        .ToListAsync();
    }
}
