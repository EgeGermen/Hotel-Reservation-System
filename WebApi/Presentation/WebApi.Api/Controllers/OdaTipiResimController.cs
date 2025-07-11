using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Application.Abstractions;
using WebApi.Api.Dtos.OdaTipi;
using WebApi.Domain.Entities;

namespace WebApi.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OdaTipiResimController : ControllerBase
    {
        private readonly IOdaTipiResimService _service;
        public OdaTipiResimController(IOdaTipiResimService service) => _service = service;

        [HttpGet("odatipi/{odaTipiId}")]
        public async Task<ActionResult<IEnumerable<OdaTipiResimDto>>> GetByOdaTipiId(int odaTipiId)
        {
            var resimler = await _service.GetByOdaTipiIdAsync(odaTipiId);
            return Ok(resimler.Select(r => new OdaTipiResimDto { Id = r.Id, OdaTipiId = r.OdaTipiId, ResimUrl = r.ResimUrl }));
        }

        [HttpPost]
        public async Task<ActionResult<OdaTipiResimDto>> Add([FromBody] OdaTipiResimDto dto)
        {
            var entity = new OdaTipiResim { OdaTipiId = dto.OdaTipiId, ResimUrl = dto.ResimUrl };
            var result = await _service.AddAsync(entity);
            return CreatedAtAction(nameof(GetByOdaTipiId), new { odaTipiId = result.OdaTipiId }, new OdaTipiResimDto { Id = result.Id, OdaTipiId = result.OdaTipiId, ResimUrl = result.ResimUrl });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _service.DeleteAsync(id);
            return NoContent();
        }
    }
} 