// Controllers/OtelController.cs
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Application.Abstractions;
using WebApi.Api.Dtos.Otel;
using WebApi.Api.Dtos.OdaTipi;
using WebApi.Api.Dtos.Admin;
using WebApi.Domain.Entities;


namespace WebApi.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OtelController : ControllerBase
    {
        private readonly IOtelService _otelService;

        public OtelController(IOtelService otelService)
        {
            _otelService = otelService;
        }

        /// <summary>
        /// Tum otelleri getirir.
        /// </summary>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<OtelDto>>> GetAll()
        {
            var oteller = await _otelService.TumOtelleriGetirAsync();
            var result = oteller.Select(o => new OtelDto
            {
                Id = o.Id,
                OtelAdi = o.OtelAdi,
                Email = o.Email,
                Telefon = o.Telefon,
                AdresSatiri1 = o.AdresSatiri1,
                Sehir = o.Sehir,
                Ulke = o.Ulke,
                Puan = o.Puan
            }).ToList();
            return Ok(result);
        }

        /// <summary>
        /// Id ile otel getirir.
        /// </summary>
        [HttpGet("{id:int}")]
        public async Task<ActionResult<OtelDto>> GetById(int id)
        {
            var o = await _otelService.IdIleOtelGetirAsync(id);
            if (o == null) return NotFound();
            var dto = new OtelDto
            {
                Id = o.Id,
                OtelAdi = o.OtelAdi,
                Email = o.Email,
                Telefon = o.Telefon,
                AdresSatiri1 = o.AdresSatiri1,
                Sehir = o.Sehir,
                Ulke = o.Ulke,
                Puan = o.Puan
            };
            return Ok(dto);
        }

        /// <summary>
        /// Yeni otel olusturur.
        /// </summary>
        [HttpPost]
        public async Task<ActionResult<OtelDto>> Create([FromBody] OtelCreateDto dto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var otel = new WebApi.Domain.Entities.Otel
            {
                OtelAdi = dto.OtelAdi,
                Email = dto.Email,
                Telefon = dto.Telefon,
                AdresSatiri1 = dto.AdresSatiri1,
                Sehir = dto.Sehir,
                Ulke = dto.Ulke,
                Puan = dto.Puan,
                AdminId = dto.AdminId
            };
            var yen = await _otelService.YeniOtelOlusturAsync(otel);
            var result = new OtelDto
            {
                Id = yen.Id,
                OtelAdi = yen.OtelAdi,
                Email = yen.Email,
                Telefon = yen.Telefon,
                AdresSatiri1 = yen.AdresSatiri1,
                Sehir = yen.Sehir,
                Ulke = yen.Ulke,
                Puan = yen.Puan
            };
            return CreatedAtAction(nameof(GetById), new { id = yen.Id }, result);
        }

        /// <summary>
        /// Var olan oteli gunceller.
        /// </summary>
        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update(int id, [FromBody] OtelUpdateDto dto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            if (id != dto.Id) return BadRequest();
            var otel = await _otelService.IdIleOtelGetirAsync(id);
            if (otel == null) return NotFound();
            otel.OtelAdi = dto.OtelAdi;
            otel.Email = dto.Email;
            otel.Telefon = dto.Telefon;
            otel.AdresSatiri1 = dto.AdresSatiri1;
            otel.Sehir = dto.Sehir;
            otel.Ulke = dto.Ulke;
            otel.Puan = dto.Puan;
            otel.AdminId = dto.AdminId;
            await _otelService.OtelGuncelleAsync(otel);
            return NoContent();
        }

        /// <summary>
        /// Id ile oteli siler.
        /// </summary>
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _otelService.OtelSilAsync(id);
            return NoContent();
        }

        /// <summary>
        /// Bir otelin oda tiplerini getirir.
        /// </summary>
        [HttpGet("{id:int}/odaTipleri")]
        public async Task<ActionResult<IEnumerable<OdaTipiDto>>> GetOdaTipleri(int id)
        {
            var odaTipleri = await _otelService.OtelinOdaTipleriniGetirAsync(id);
            return Ok(odaTipleri.Select(ot => new OdaTipiDto {
                Id = ot.Id,
                OdaTipiAdi = ot.OdaTipiAdi,
                Kapasite = ot.Kapasite,
                Fiyat = ot.Fiyat,
                OtelId = ot.OtelId,
                Aciklama = ot.Aciklama
            }));
        }

        /// <summary>
        /// Bir otelin yoneticisini getirir.
        /// </summary>
        [HttpGet("{id:int}/admin")]
        public async Task<ActionResult<AdminDto>> GetAdmin(int id)
        {
            var o = await _otelService.IdIleOtelGetirAsync(id);
            if (o?.Admin == null) return NotFound();
            return Ok(new AdminDto { Id = o.Admin.Id, KullaniciAdi = o.Admin.KullaniciAdi });
        }
    }
}
