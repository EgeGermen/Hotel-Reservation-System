// Controllers/OdaTipiController.cs
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Application.Abstractions;
using WebApi.Domain.Entities;
using WebApi.Api.Dtos.OdaTipi;

namespace WebApi.Api.Controllers
{
    /// <summary>
    /// OdaTipi işlemleri için controller.
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    public class OdaTipiController : ControllerBase
    {
        private readonly IOdaTipiService _service;

        public OdaTipiController(IOdaTipiService service)
        {
            _service = service;
        }

        /// <summary>
        /// Tum oda tiplerini getirir.
        /// </summary>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<OdaTipiDto>>> GetAll()
        {
            var odaTipleri = await _service.TumOdaTipleriniGetirAsync();
            return Ok(odaTipleri.Select(o => new OdaTipiDto { Id = o.Id, OdaTipiAdi = o.OdaTipiAdi, Kapasite = o.Kapasite, Fiyat = o.Fiyat, OtelId = o.OtelId , IndirimOrani = o.IndirimOrani, Aciklama = o.Aciklama }));
        }

        /// <summary>
        /// Id ile oda tipini getirir.
        /// </summary>
        [HttpGet("{id:int}")]
        public async Task<ActionResult<OdaTipiDto>> GetById(int id)
        {
            var o = await _service.IdIleOdaTipiniGetirAsync(id);
            if (o == null) return NotFound();
            return Ok(new OdaTipiDto { 
                Id = o.Id,
                OdaTipiAdi = o.OdaTipiAdi,
                Kapasite = o.Kapasite,
                Fiyat = o.Fiyat,
                OtelId = o.OtelId,
                IndirimOrani = o.IndirimOrani,
                Aciklama = o.Aciklama
            });
        }

        /// <summary>
        /// Yeni oda tipini olusturur.
        /// </summary>
        [HttpPost]
        public async Task<ActionResult<OdaTipiDto>> Create([FromBody] OdaTipiCreateDto dto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var odaTipi = new OdaTipi { OdaTipiAdi = dto.OdaTipiAdi, Kapasite = dto.Kapasite, Fiyat = dto.Fiyat, OtelId = dto.OtelId, Aciklama = dto.Aciklama , IndirimOrani = dto.IndirimOrani };
            var yen = await _service.YeniOdaTipiOlusturAsync(odaTipi);
            return CreatedAtAction(nameof(GetById), new { id = yen.Id }, new OdaTipiDto { Id = yen.Id, OdaTipiAdi = yen.OdaTipiAdi, Kapasite = yen.Kapasite, Fiyat = yen.Fiyat, OtelId = yen.OtelId , IndirimOrani = yen.IndirimOrani, Aciklama = yen.Aciklama });
        }

        /// <summary>
        /// Var olan oda tipini gunceller.
        /// </summary>
        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update(int id, [FromBody] OdaTipiUpdateDto dto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            if (id != dto.Id) return BadRequest();
            var odaTipi = await _service.IdIleOdaTipiniGetirAsync(id);
            if (odaTipi == null) return NotFound();
            odaTipi.OdaTipiAdi = dto.OdaTipiAdi;
            odaTipi.Kapasite = dto.Kapasite;
            odaTipi.Fiyat = dto.Fiyat;
            odaTipi.OtelId = dto.OtelId;
            odaTipi.Aciklama = dto.Aciklama;
            odaTipi.IndirimOrani = dto.IndirimOrani;
            await _service.OdaTipiGuncelleAsync(odaTipi);
            return NoContent();
        }

        /// <summary>
        /// Id ile oda tipini siler.
        /// </summary>
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _service.OdaTipiSilAsync(id);
            return NoContent();
        }

        /// <summary>
        /// Bir otele ait oda tiplerini getirir.
        /// </summary>
        [HttpGet("otel/{otelId:int}")]
        public async Task<ActionResult<IEnumerable<OdaTipiDto>>> GetByOtel(int otelId)
        {
            var odaTipleri = await _service.OteleAitOdaTipleriniGetirAsync(otelId);
            return Ok(odaTipleri.Select(o => new OdaTipiDto { Id = o.Id, OdaTipiAdi = o.OdaTipiAdi, Kapasite = o.Kapasite, Fiyat = o.Fiyat, OtelId = o.OtelId , IndirimOrani = o.IndirimOrani, Aciklama = o.Aciklama }));
        }

        /// <summary>
        /// Tarih araligina gore oda tipi uygun mu kontrol eder.
        /// </summary>
        [HttpGet("availability")]
        public async Task<ActionResult<bool>> CheckAvailability(
            [FromQuery] int odaTipiId,
            [FromQuery] DateTime giris,
            [FromQuery] DateTime cikis)
        {
            return Ok(await _service.UygunlukKontroluYapAsync(odaTipiId, giris, cikis));
        }
    }
}
