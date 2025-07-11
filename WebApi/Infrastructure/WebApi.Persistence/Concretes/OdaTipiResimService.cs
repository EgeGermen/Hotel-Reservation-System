using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebApi.Application.Abstractions;
using WebApi.Domain.Entities;
using WebApi.Persistence.Contexts;

namespace WebApi.Persistence.Concretes
{
    public class OdaTipiResimService : IOdaTipiResimService
    {
        private readonly ApplicationDbContext _context;
        public OdaTipiResimService(ApplicationDbContext context) => _context = context;

        public async Task<IEnumerable<OdaTipiResim>> GetByOdaTipiIdAsync(int odaTipiId)
            => await _context.OdaTipiResimler.Where(x => x.OdaTipiId == odaTipiId).ToListAsync();

        public async Task<OdaTipiResim> GetByIdAsync(int id)
            => await _context.OdaTipiResimler.FindAsync(id);

        public async Task<OdaTipiResim> AddAsync(OdaTipiResim resim)
        {
            await _context.OdaTipiResimler.AddAsync(resim);
            await _context.SaveChangesAsync();
            return resim;
        }

        public async Task DeleteAsync(int id)
        {
            var entity = await _context.OdaTipiResimler.FindAsync(id);
            if (entity != null)
            {
                _context.OdaTipiResimler.Remove(entity);
                await _context.SaveChangesAsync();
            }
        }
    }
} 