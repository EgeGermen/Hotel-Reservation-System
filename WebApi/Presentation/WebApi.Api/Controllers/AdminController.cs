// Controllers/AdminController.cs
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Application.Abstractions;
using WebApi.Api.Dtos.Admin;
using WebApi.Api.Dtos.Otel;

namespace WebApi.Api.Controllers
{
    /// <summary>
    /// Admin işlemleri için controller.
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    public class AdminController : ControllerBase
    {
        private readonly IAdminService _service;
        private readonly IOtelService _otelService;
        public AdminController(IAdminService service, IOtelService otelService) => (_service, _otelService) = (service, otelService);

        /// <summary>
        /// Tüm yöneticileri getirir.
        /// </summary>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AdminDto>>> GetAll()
        {
            var admins = await _service.TumAdminleriGetirAsync();
            return Ok(admins.Select(a => new AdminDto
            {
                Id = a.Id,
                KullaniciAdi = a.KullaniciAdi
            }));
        }

        /// <summary>
        /// Id ile yöneticiyi getirir.
        /// </summary>
        [HttpGet("{id:int}")]
        public async Task<ActionResult<AdminDto>> GetById(int id)
        {
            var a = await _service.IdIleAdminiGetirAsync(id);
            if (a == null) return NotFound();
            return Ok(new AdminDto
            {
                Id = a.Id,
                KullaniciAdi = a.KullaniciAdi
            });
        }

        /// <summary>
        /// Yeni yönetici oluşturur.
        /// </summary>
        [HttpPost]
        public async Task<ActionResult<AdminDto>> Create([FromBody] AdminCreateDto dto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var admin = new WebApi.Domain.Entities.Admin
            {
                KullaniciAdi = dto.KullaniciAdi,
                sifre = dto.sifre
            };
            var yen = await _service.YeniAdminOlusturAsync(admin);
            return CreatedAtAction(nameof(GetById), new { id = yen.Id }, new AdminDto
            {
                Id = yen.Id,
                KullaniciAdi = yen.KullaniciAdi
            });
        }

        /// <summary>
        /// Var olan yöneticiyi günceller.
        /// </summary>
        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update(int id, [FromBody] AdminUpdateDto dto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            if (id != dto.Id) return BadRequest();
            var admin = await _service.IdIleAdminiGetirAsync(id);
            if (admin == null) return NotFound();
            admin.KullaniciAdi = dto.KullaniciAdi;
            if (!string.IsNullOrWhiteSpace(dto.sifre)) admin.sifre = dto.sifre;
            await _service.AdminiGuncelleAsync(admin);
            return NoContent();
        }

        /// <summary>
        /// Id ile yönetici kaydını siler.
        /// </summary>
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _service.AdminiSilAsync(id);
            return NoContent();
        }

        /// <summary>
        /// Bir otele ait yöneticiyi getirir.
        /// </summary>
        [HttpGet("otel/{id:int}")]
        public async Task<ActionResult<AdminDto>> GetByOtel(int id)
        {
            var otel = await _otelService.IdIleOtelGetirAsync(id);
            if (otel?.Admin == null) return NotFound();
            return Ok(new AdminDto
            {
                Id = otel.Admin.Id,
                KullaniciAdi = otel.Admin.KullaniciAdi
            });
        }

        /// <summary>
        /// Yönetici kullanıcı adı ve parola ile kimlik doğrulama yapar.
        /// </summary>
        [HttpPost("authenticate")]
        public async Task<ActionResult<AdminDto>> Authenticate([FromBody] AdminLoginDto credentials)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var a = await _service.KimlikDogrulaAsync(credentials.KullaniciAdi, credentials.sifre);
            if (a == null) return Unauthorized();
            return Ok(new AdminDto
            {
                Id = a.Id,
                KullaniciAdi = a.KullaniciAdi
            });
        }

        /// <summary>
        /// Bir adminin tüm otellerini getirir.
        /// </summary>
        [HttpGet("{adminId:int}/oteller")]
        public async Task<ActionResult<IEnumerable<OtelDto>>> GetOtellerByAdmin(int adminId)
        {
            var oteller = await _service.AdmininOtelleriniGetirAsync(adminId);
            if (oteller == null || !oteller.Any()) return NotFound();
            return Ok(oteller.Select(o => new OtelDto
            {
                Id = o.Id,
                OtelAdi = o.OtelAdi,
                Email = o.Email,
                Telefon = o.Telefon,
                AdresSatiri1 = o.AdresSatiri1,
                Sehir = o.Sehir,
                Ulke = o.Ulke,
                Puan = o.Puan
            }));
        }

        /// <summary>
        /// Id ile admin şifresini getirir.
        /// </summary>
        [HttpGet("{id:int}/sifre")]
        public async Task<ActionResult<string>> GetSifre(int id)
        {
            var sifre = await _service.AdminSifresiGetirAsync(id);
            if (sifre == null) return NotFound();
            return Ok(sifre);
        }
    }
}
