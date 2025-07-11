using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Application.Abstractions;
using WebApi.Api.Dtos.Otel;
using WebApi.Domain.Entities;

namespace WebApi.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OtelResimController : ControllerBase
    {
        private readonly IOtelResimService _service;
        public OtelResimController(IOtelResimService service) => _service = service;

        [HttpGet("otel/{otelId}")]
        public async Task<ActionResult<IEnumerable<OtelResimDto>>> GetByOtelId(int otelId)
        {
            var resimler = await _service.GetByOtelIdAsync(otelId);
            return Ok(resimler.Select(r => new OtelResimDto { Id = r.Id, OtelId = r.OtelId, ResimUrl = r.ResimUrl }));
        }

        [HttpPost]
        public async Task<ActionResult<OtelResimDto>> Add([FromBody] OtelResimDto dto)
        {
            var entity = new OtelResim { OtelId = dto.OtelId, ResimUrl = dto.ResimUrl };
            var result = await _service.AddAsync(entity);
            return CreatedAtAction(nameof(GetByOtelId), new { otelId = result.OtelId }, new OtelResimDto { Id = result.Id, OtelId = result.OtelId, ResimUrl = result.ResimUrl });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _service.DeleteAsync(id);
            return NoContent();
        }
    }
} 