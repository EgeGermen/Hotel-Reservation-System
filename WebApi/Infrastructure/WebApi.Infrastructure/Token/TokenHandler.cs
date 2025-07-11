using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApi.Application.Abstractions.Token;

namespace WebApi.Infrastructure.Token
{
    public class TokenHandler : ITokenHandler
    {
        readonly IConfiguration _configuration;
        

        public TokenHandler (IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public Application.DTOss.Token CreateAccessToken(int minute)
        {
            //security key n simetriğini alıyoruz
            Application.DTOss.Token token = new();
            SymmetricSecurityKey securityKey = new(Encoding.UTF8.GetBytes(_configuration["Token:SecurityKey"]));

            //şifrelenmiş kimliği oluşturuyoruz
            SigningCredentials signingCredentials = new(securityKey, SecurityAlgorithms.HmacSha256);

            //oluşturulacak token ayarlarını veriyoruz

            token.Expiration = DateTime.UtcNow.AddMinutes(minute);
            JwtSecurityToken securityToken = new(
                audience : _configuration[ "Token : Audience"],
                issuer : _configuration["Token : Issuer"],
                expires: token.Expiration,
                notBefore: DateTime.UtcNow,
                signingCredentials :signingCredentials
                );

            //token oluşturucu sınıfından bir örnek alalım 
            JwtSecurityTokenHandler tokenHandler = new();
            token.AccessToken = tokenHandler.WriteToken(securityToken);
            return token;
        
        }
    }
}
 