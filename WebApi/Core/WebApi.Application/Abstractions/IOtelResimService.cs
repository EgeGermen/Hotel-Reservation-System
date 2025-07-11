using System.Collections.Generic;
using System.Threading.Tasks;
using WebApi.Domain.Entities;

namespace WebApi.Application.Abstractions
{
    public interface IOtelResimService
    {
        Task<IEnumerable<OtelResim>> GetByOtelIdAsync(int otelId);
        Task<OtelResim> GetByIdAsync(int id);
        Task<OtelResim> AddAsync(OtelResim resim);
        Task DeleteAsync(int id);
    }
} 