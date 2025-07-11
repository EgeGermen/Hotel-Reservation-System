using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Scalar.AspNetCore;
using System.Reflection;
using System.Text;
using WebApi.Application.Features.Commands.AppUser.CreateUser;
using WebApi.Persistence; //BUNU DA EKLEMEYİ UNUTMA !!!!!!!!!
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);


// 2) CORS politikası
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod());
});


builder.Services.AddPersistenceServices(); //!!!!!!!!!!!11
//Bu satır eklenen servisleri program başladığında çağırıp açılması için servis kısmında tanımlanır
builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(CreateUserCommandHandler).Assembly));


// 3) Controller ve OpenAPI/Swagger/Scalar
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    var xmlFilename = $"{System.Reflection.Assembly.GetExecutingAssembly().GetName().Name}.xml";
    options.IncludeXmlComments(Path.Combine(AppContext.BaseDirectory, xmlFilename));
});
builder.Services.AddOpenApi();  // Scalar için


//token kısmı

builder.Services.AddAuthentication("Admin")
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new()
        {
            ValidateAudience = true, //oluşturulacak token değerini kimlerin hangi originlerin kullanıcı belirlediğiniz değerdir.
            ValidateIssuer = true, //oluşturulacak token değerini kimin dağıttığını ifade edeceğimiz alandır 
            ValidateLifetime = true, //oluştutulan token değerini süresini kontrol edecek olan doğrulamadır.
            ValidateIssuerSigningKey = true, //üretilecek token değerinin uygulamamıza ait bir değer olduğunu ifade eden secury key verisinin doğrulanmasıdır.
            ValidAudience = builder.Configuration["Token:Audince"],
            ValidIssuer = builder.Configuration["Token:Issuer"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Token:SecurityKey"]))

        };

    });




var app = builder.Build();



// (Opsiyonel) HTTP → HTTPS yönlendirmesi
app.UseHttpsRedirection();
// CORS'ı en başta devreye al
app.UseCors("AllowAll");
// Swagger UI
app.UseSwagger();
app.UseSwaggerUI();




// Scalar/OpenAPI sadece development'da
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference();
}

app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();