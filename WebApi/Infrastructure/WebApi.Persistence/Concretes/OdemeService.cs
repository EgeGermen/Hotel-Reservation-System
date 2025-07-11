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
    public class OdemeService : IOdemeService
    {
        private readonly ApplicationDbContext _context;

        public OdemeService(ApplicationDbContext context)
            => _context = context;

        public async Task<IEnumerable<Odeme>> TumOdemeleriGetirAsync()
            => await _context.Odemeler
                .Include(p => p.Rezervasyon)
                .ToListAsync();

        public async Task<Odeme> IdIleOdemeGetirAsync(int id)
            => await _context.Odemeler
                .Include(p => p.Rezervasyon)
                .FirstOrDefaultAsync(p => p.Id == id);

        public async Task<Odeme> YeniOdemeKaydiOlusturAsync(Odeme odeme)
        {
            await _context.Odemeler.AddAsync(odeme);
            await _context.SaveChangesAsync();
            return odeme;
        }

        public async Task OdemeGuncelleAsync(Odeme odeme)
        {
            _context.Odemeler.Update(odeme);
            await _context.SaveChangesAsync();
        }

        public async Task OdemeSilAsync(int id)
        {
            var p = await _context.Odemeler.FindAsync(id);
            if (p != null)
            {
                _context.Odemeler.Remove(p);
                await _context.SaveChangesAsync();
            }
        }

        public async Task OdemeIsleminiYurutAsync(int odemeId)
        {
            var p = await _context.Odemeler
                .Include(o => o.Rezervasyon)
                .FirstOrDefaultAsync(o => o.Id == odemeId);
            if (p != null)
            {
                p.Durum = OdemeDurumu.Odendi;
                p.Rezervasyon.Durum = RezervasyonDurumu.Onaylandi;
                await _context.SaveChangesAsync();
            }
        }

        public async Task<IEnumerable<Odeme>> RezervasyonaAitOdemeleriGetirAsync(int rezervasyonId)
            => await _context.Odemeler
                .Where(p => p.RezervasyonId == rezervasyonId)
                .ToListAsync();

        public async Task<IEnumerable<Odeme>> KullanicininOdemeleriniGetirAsync(string appUserId)
            => await _context.Odemeler
                .Include(o => o.Rezervasyon)
                .Where(o => o.Rezervasyon.AppUserId == appUserId)
                .ToListAsync();
    }
}
