using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebApi.Application.Abstractions;
using WebApi.Domain.Entities;
using WebApi.Persistence.Contexts;

namespace WebApi.Persistence.Concretes
{
    public class OtelResimService : IOtelResimService
    {
        private readonly ApplicationDbContext _context;
        public OtelResimService(ApplicationDbContext context) => _context = context;

        public async Task<IEnumerable<OtelResim>> GetByOtelIdAsync(int otelId)
            => await _context.OtelResimler.Where(x => x.OtelId == otelId).ToListAsync();

        public async Task<OtelResim> GetByIdAsync(int id)
            => await _context.OtelResimler.FindAsync(id);

        public async Task<OtelResim> AddAsync(OtelResim resim)
        {
            await _context.OtelResimler.AddAsync(resim);
            await _context.SaveChangesAsync();
            return resim;
        }

        public async Task DeleteAsync(int id)
        {
            var entity = await _context.OtelResimler.FindAsync(id);
            if (entity != null)
            {
                _context.OtelResimler.Remove(entity);
                await _context.SaveChangesAsync();
            }
        }
    }
} 