using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Application.Abstractions;
using WebApi.Domain.Entities;
using WebApi.Persistence.Contexts;
using Microsoft.EntityFrameworkCore;

namespace WebApi.Persistence.Concretes
{
    public class AdminService : IAdminService
    {
        private readonly ApplicationDbContext _context;
        public AdminService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Admin>> TumAdminleriGetirAsync()
            => await _context.Admins.ToListAsync();

        public async Task<Admin> IdIleAdminiGetirAsync(int id)
            => await _context.Admins.FirstOrDefaultAsync(a => a.Id == id);

        public async Task<Admin> YeniAdminOlusturAsync(Admin admin)
        {
            await _context.Admins.AddAsync(admin);
            await _context.SaveChangesAsync();
            return admin;
        }

        public async Task AdminiGuncelleAsync(Admin admin)
        {
            _context.Admins.Update(admin);
            await _context.SaveChangesAsync();
        }

        public async Task AdminiSilAsync(int id)
        {
            var admin = await _context.Admins.FindAsync(id);
            if (admin != null)
            {
                _context.Admins.Remove(admin);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<List<Otel>> AdmininOtelleriniGetirAsync(int adminId)
            => await _context.Oteller.Where(o => o.AdminId == adminId).ToListAsync();

        public async Task<Admin> KimlikDogrulaAsync(string kullaniciAdi, string parola)
            => await _context.Admins.FirstOrDefaultAsync(a => a.KullaniciAdi == kullaniciAdi && a.sifre == parola);

        public async Task<string> AdminSifresiGetirAsync(int id)
        {
            var admin = await _context.Admins.FirstOrDefaultAsync(a => a.Id == id);
            return admin?.sifre;
        }

        public async Task<Otel> AdmininOteliniGetirAsync(int adminId)
            => await _context.Oteller.FirstOrDefaultAsync(o => o.AdminId == adminId);
    }
} 