// Controllers/RezervasyonController.cs
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Application.Abstractions;
using WebApi.Api.Dtos.Rezervasyon;
using WebApi.Api.Dtos.Odeme;

namespace WebApi.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RezervasyonController : ControllerBase
    {
        private readonly IRezervasyonService _service;
        public RezervasyonController(IRezervasyonService service) => _service = service;

        /// <summary>
        /// Tum rezervasyonlari getirir.
        /// </summary>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RezervasyonDto>>> GetAll()
        {
            var rezervasyonlar = await _service.TumRezervasyonlariGetirAsync();
            var result = rezervasyonlar.Select(r => new RezervasyonDto
            {
                Id = r.Id,
                AppUserId = r.AppUserId,
                OdaTipiId = r.OdaTipiId,
                GirisTarihi = r.GirisTarihi,
                CikisTarihi = r.CikisTarihi,
                RezervasyonTarihi = r.RezervasyonTarihi,
                ToplamUcret = r.ToplamUcret,
                Durum = r.Durum.ToString(),
                
            }).ToList();
            return Ok(result);
        }

        /// <summary>
        /// Id ile rezervasyon getirir.
        /// </summary>
        [HttpGet("{id:int}")]
        public async Task<ActionResult<RezervasyonDto>> GetById(int id)
        {
            var r = await _service.IdIleRezervasyonGetirAsync(id);
            if (r == null) return NotFound();
            return Ok(new RezervasyonDto
            {
                Id = r.Id,
                AppUserId = r.AppUserId,
                OdaTipiId = r.OdaTipiId,
                GirisTarihi = r.GirisTarihi,
                CikisTarihi = r.CikisTarihi,
                RezervasyonTarihi = r.RezervasyonTarihi,
                ToplamUcret = r.ToplamUcret,
                Durum = r.Durum.ToString(),
               
            });
        }

        /// <summary>
        /// Yeni rezervasyon olusturur (once uygunluk kontrolu yapilabilir).
        /// </summary>
        [HttpPost]
        public async Task<ActionResult<RezervasyonDto>> Create([FromBody] RezervasyonCreateDto dto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var rezervasyon = new WebApi.Domain.Entities.Rezervasyon
            {
                AppUserId = dto.AppUserId,
                OdaTipiId = dto.OdaTipiId,
                GirisTarihi = dto.GirisTarihi,
                CikisTarihi = dto.CikisTarihi,
                ToplamUcret = dto.ToplamUcret ?? 0
            };
            var yeni = await _service.YeniRezervasyonOlusturAsync(rezervasyon);
            var result = new RezervasyonDto
            {
                Id = yeni.Id,
                AppUserId = yeni.AppUserId,
                OdaTipiId = yeni.OdaTipiId,
                GirisTarihi = yeni.GirisTarihi,
                CikisTarihi = yeni.CikisTarihi,
                RezervasyonTarihi = yeni.RezervasyonTarihi,
                ToplamUcret = yeni.ToplamUcret,
                Durum = yeni.Durum.ToString(),
                
            };
            return CreatedAtAction(nameof(GetById), new { id = yeni.Id }, result);
        }

        /// <summary>
        /// Var olan rezervasyonu gunceller.
        /// </summary>
        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update(int id, [FromBody] RezervasyonUpdateDto dto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            if (id != dto.Id) return BadRequest();
            var rezervasyon = await _service.IdIleRezervasyonGetirAsync(id);
            if (rezervasyon == null) return NotFound();
            rezervasyon.AppUserId = dto.AppUserId;
            rezervasyon.OdaTipiId = dto.OdaTipiId;
            rezervasyon.GirisTarihi = dto.GirisTarihi;
            rezervasyon.CikisTarihi = dto.CikisTarihi;
            await _service.RezervasyonGuncelleAsync(rezervasyon);
            return NoContent();
        }

        /// <summary>
        /// Id ile rezervasyonu siler veya iptal eder.
        /// </summary>
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _service.RezervasyonSilAsync(id);
            return NoContent();
        }

        /// <summary>
        /// Oda tipi ve tarih araligina gore uygunluk kontrolu yapar.
        /// </summary>
        [HttpGet("check")]
        public async Task<ActionResult<bool>> CheckAvailability([FromQuery] int odaTipiId, [FromQuery] DateTime giris, [FromQuery] DateTime cikis)
        {
            return Ok(await _service.UygunlukKontroluYapAsync(odaTipiId, giris, cikis));
        }

        /// <summary>
        /// Rezervasyonu onaylar (durumunu gunceller).
        /// </summary>
        [HttpPost("{id:int}/confirm")]
        public async Task<IActionResult> Confirm(int id)
        {
            await _service.RezervasyonuOnaylaAsync(id);
            return NoContent();
        }

        /// <summary>
        /// Rezervasyonu iptal eder.
        /// </summary>
        [HttpPost("{id:int}/cancel")]
        public async Task<IActionResult> Cancel(int id)
        {
            await _service.RezervasyonuIptalEtAsync(id);
            return NoContent();
        }

        /// <summary>
        /// Bir musterinin tum rezervasyonlarini getirir.
        /// </summary>
        [HttpGet("kullanici/{appUserId}")]
        public async Task<ActionResult<IEnumerable<RezervasyonDto>>> GetByAppUser(string appUserId)
        {
            var rezervasyonlar = await _service.MusterininRezervasyonlariniGetirAsync(appUserId);
            var result = rezervasyonlar?.Select(r => new RezervasyonDto
            {
                Id = r.Id,
                AppUserId = r.AppUserId,
                OdaTipiId = r.OdaTipiId,
                GirisTarihi = r.GirisTarihi,
                CikisTarihi = r.CikisTarihi,
                RezervasyonTarihi = r.RezervasyonTarihi,
                ToplamUcret = r.ToplamUcret,
                Durum = r.Durum.ToString(),
                OtelId = r.OdaTipi?.Otel?.Id,
                OtelAdi = r.OdaTipi?.Otel?.OtelAdi,
            }).ToList() ?? new List<RezervasyonDto>();
            return Ok(result);
        }

    }
}
