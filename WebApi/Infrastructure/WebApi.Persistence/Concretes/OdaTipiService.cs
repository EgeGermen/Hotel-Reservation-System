using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebApi.Application.Abstractions;   // IOdaTipiService buradan geliyor
using WebApi.Domain.Entities;           // OdaTipi, Rezervasyon vb.
using WebApi.Domain.Entities.Enum;      // RezervasyonDurumu enum'u
using WebApi.Persistence.Contexts;      // ApplicationDbContext



namespace WebApi.Persistence.Concretes
{
    public class OdaTipiService : IOdaTipiService
    {
        private readonly ApplicationDbContext _context;

        public OdaTipiService(ApplicationDbContext context)
            => _context = context;

        // 1) Tüm OdaTiplerini getir
        public async Task<IEnumerable<Domain.Entities.OdaTipi>> TumOdaTipleriniGetirAsync()
        {
            return await _context.OdaTipleri
                                 .Include(ot => ot.Otel)
                                 .ToListAsync();
        }

        // 2) Id ile tek OdaTipi getir
        public async Task<Domain.Entities.OdaTipi> IdIleOdaTipiniGetirAsync(int id)
        {
            return await _context.OdaTipleri
                                 .Include(ot => ot.Otel)
                                 .FirstOrDefaultAsync(ot => ot.Id == id);
        }

        // 3) Yeni OdaTipi oluştur
        public async Task<Domain.Entities.OdaTipi> YeniOdaTipiOlusturAsync(Domain.Entities.OdaTipi odaTipi)
        {
            await _context.OdaTipleri.AddAsync(odaTipi);
            await _context.SaveChangesAsync();
            return odaTipi;
        }

        // 4) Var olan OdaTipi güncelle
        public async Task OdaTipiGuncelleAsync(Domain.Entities.OdaTipi odaTipi)
        {
            _context.OdaTipleri.Update(odaTipi);
            await _context.SaveChangesAsync();
        }

        // 5) Id ile OdaTipi sil
        public async Task OdaTipiSilAsync(int id)
        {
            var entity = await _context.OdaTipleri.FindAsync(id);
            if (entity != null)
            {
                _context.OdaTipleri.Remove(entity);
                await _context.SaveChangesAsync();
            }
        }

        // 6) Belirli Otel'e ait OdaTiplerini getir
        public async Task<IEnumerable<Domain.Entities.OdaTipi>> OteleAitOdaTipleriniGetirAsync(int otelId)
        {
            return await _context.OdaTipleri
                                 .Where(ot => ot.OtelId == otelId)
                                 .ToListAsync();
        }

        // 7) Tarih aralığına göre uygunluk kontrolü
        public async Task<bool> UygunlukKontroluYapAsync(int odaTipiId, DateTime giris, DateTime cikis)
        {
            var kesisen = await _context.Rezervasyonlar.CountAsync(r =>
                r.OdaTipiId == odaTipiId &&
                r.GirisTarihi < cikis &&
                r.CikisTarihi > giris &&
                r.Durum == RezervasyonDurumu.Onaylandi);

            // OdaTipi'nin kapasitesini al
            var kapasite = await _context.OdaTipleri
                .Where(x => x.Id == odaTipiId)
                .Select(x => x.Kapasite)
                .FirstOrDefaultAsync();

            // Kapasite kadar oda varsa uygun değildir
            return kesisen < kapasite;
        }
    }
}
