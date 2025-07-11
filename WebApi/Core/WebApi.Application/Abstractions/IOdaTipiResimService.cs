using System.Collections.Generic;
using System.Threading.Tasks;
using WebApi.Domain.Entities;

namespace WebApi.Application.Abstractions
{
    public interface IOdaTipiResimService
    {
        Task<IEnumerable<OdaTipiResim>> GetByOdaTipiIdAsync(int odaTipiId);
        Task<OdaTipiResim> GetByIdAsync(int id);
        Task<OdaTipiResim> AddAsync(OdaTipiResim resim);
        Task DeleteAsync(int id);
    }
} 