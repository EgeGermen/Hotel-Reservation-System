using Microsoft.AspNetCore.Mvc;
using System.Linq;
using WebApi.Persistence.Contexts;
using WebApi.Domain.Entities;

namespace WebApi.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class KullaniciKartController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public KullaniciKartController(ApplicationDbContext context)
        {
            _context = context;
        }

        // Belirli bir kullanıcıya ait kartları getir
        [HttpGet("{kullaniciId}")]
        public IActionResult GetUserCards(string kullaniciId)
        {
            var kartlar = _context.KullaniciKartlar
                .Where(k => k.KullaniciId == kullaniciId)
                .ToList();
            return Ok(kartlar);
        }

        // Yeni kart ekle
        [HttpPost]
        public IActionResult AddCard([FromBody] KullaniciKart kart)
        {
            _context.KullaniciKartlar.Add(kart);
            _context.SaveChanges();
            return Ok(kart);
        }

        // Kart sil
        [HttpDelete("{id}")]
        public IActionResult DeleteCard(int id)
        {
            var kart = _context.KullaniciKartlar.Find(id);
            if (kart == null) return NotFound();
            _context.KullaniciKartlar.Remove(kart);
            _context.SaveChanges();
            return NoContent();
        }
    }
} 