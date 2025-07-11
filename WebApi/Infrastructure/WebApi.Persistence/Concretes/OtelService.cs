using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApi.Application.Abstractions;
using WebApi.Domain.Entities;
using WebApi.Persistence.Contexts;

namespace WebApi.Persistence.Concretes
{
    public class OtelService : IOtelService
    {
        private readonly ApplicationDbContext _context;

        public OtelService(ApplicationDbContext context)
            => _context = context;

        public async Task<IEnumerable<Otel>> TumOtelleriGetirAsync()
            => await _context.Oteller
                .Include(o => o.OdaTipleri)
                .Include(o => o.Admin)
                .ToListAsync();

        public async Task<Otel> IdIleOtelGetirAsync(int id)
            => await _context.Oteller
                .Include(o => o.OdaTipleri)
                .Include(o => o.Admin)
                .FirstOrDefaultAsync(o => o.Id == id);

        public async Task<Otel> YeniOtelOlusturAsync(Otel otel)
        {
            await _context.Oteller.AddAsync(otel);
            await _context.SaveChangesAsync();
            return otel;
        }

        public async Task OtelGuncelleAsync(Otel otel)
        {
            _context.Oteller.Update(otel);
            await _context.SaveChangesAsync();
        }

        public async Task OtelSilAsync(int id)
        {
            var o = await _context.Oteller.FindAsync(id);
            if (o != null)
            {
                _context.Oteller.Remove(o);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<IEnumerable<OdaTipi>> OtelinOdaTipleriniGetirAsync(int id)
            => await _context.OdaTipleri
                .Where(ot => ot.OtelId == id)
                .ToListAsync();

        public async Task<Admin> OtelinAdmininiGetirAsync(int id)
            => (await _context.Oteller.Include(o => o.Admin).FirstOrDefaultAsync(o => o.Id == id))?.Admin;

    }
}
