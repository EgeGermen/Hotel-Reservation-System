// ServiceRegistration.cs
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.PowerBI.Api.Models;
using WebApi.Application.Abstractions;
using WebApi.Application.Abstractions.Token;
using WebApi.Domain.Entities.Identity;
using WebApi.Persistence.Concretes;
using WebApi.Persistence.Contexts;
using WebApi.Application.Abstractions.Token;
using WebApi.Infrastructure.Token;

namespace WebApi.Persistence
{
    /// <summary>
    /// Persistence katmanındaki servislerin IoC container'a kaydını yapar.
    /// </summary>
    public static class ServiceRegistration
    {
        /// <summary>
        /// DbContext ve tüm persistence servislerini kaydeder.
        /// </summary>
        public static void AddPersistenceServices(this IServiceCollection services)
        {
            // --- DbContext kaydı ---
            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseNpgsql(Configurations.ConnectionString));

            // --- Service implementasyonları ---
            services.AddScoped<IOtelService, OtelService>();
            services.AddScoped<IOdaTipiService, OdaTipiService>();
            services.AddScoped<IRezervasyonService, RezervasyonService>();
            services.AddScoped<IOdemeService, OdemeService>();
            services.AddScoped<IAdminService, AdminService>();
            services.AddScoped<IOtelResimService, OtelResimService>();
            services.AddScoped<IOdaTipiResimService, OdaTipiResimService>();
            services.AddScoped<ITokenHandler, TokenHandler>();


            // Migrations işlemlerini CLI veya Package Manager Console'dan:
            //   dotnet ef migrations add InitialCreate
            //   dotnet ef database update

            services.AddIdentity<WebApi.Domain.Entities.Identity.AppUser, WebApi.Domain.Entities.Identity.AppRole>(options =>
            {
                options.Password.RequiredLength = 3;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireDigit = false;
                options.Password.RequireLowercase = false;
                options.Password.RequireUppercase = false;
                options.User.RequireUniqueEmail = true;


            })
               .AddEntityFrameworkStores<ApplicationDbContext>();
        }
    }
}
