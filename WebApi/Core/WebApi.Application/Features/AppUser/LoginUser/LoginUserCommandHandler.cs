using MediatR;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApi.Application.Abstractions.Token;
using WebApi.Application.DTOss;
using WebApi.Application.Exceptions;

namespace WebApi.Application.Features.AppUser.LoginUser
{
    public class LoginUserCommandHandler : IRequestHandler <LoginUserCommandRequest , LoginUserCommandResponse>
    {
        //bana requestten gelen değeri bu değere karşılık e mail şifre var mı kontrol etmek için 
        readonly UserManager<Domain.Entities.Identity.AppUser> _userManager;
        readonly SignInManager<Domain.Entities.Identity.AppUser> _signInManager;
        readonly ITokenHandler _tokenHandler;
        public LoginUserCommandHandler(
        UserManager<WebApi.Domain.Entities.Identity.AppUser> userManager,
        SignInManager<WebApi.Domain.Entities.Identity.AppUser> signInManager,
        ITokenHandler tokenHandler)
        {

            _userManager = userManager;
            _signInManager = signInManager;
            _tokenHandler = tokenHandler;
        }
        public async Task<LoginUserCommandResponse> Handle(LoginUserCommandRequest request, CancellationToken cancellationToken)
        {
            try
            {
                Domain.Entities.Identity.AppUser user = await _userManager.FindByEmailAsync(request.Email);

                if (user == null)
                    throw new NotFoundUserException("Kullanıcı veya şifre hatalı..");

                SignInResult result = await _signInManager.CheckPasswordSignInAsync(user, request.Sifre, false);

                if (result.Succeeded) // authentication başarılı
                {
                    Token token = _tokenHandler.CreateAccessToken(5);
                    // UserDto oluştur
                    var userDto = new UserDto
                    {
                        Id = user.Id,
                        UserName = user.UserName,
                        Email = user.Email,
                        AdiSoyadi = user.AdiSoyadi
                    };
                    return new LoginUserSuccessCommandResponse()
                    {
                        Token = token,
                        User = userDto
                    };
                }

                return new LoginUserErrorCommandResponse()
                {
                    Message = "Email veya şifre hatalı"
                };
            }
            catch (NotFoundUserException ex)
            {
                return new LoginUserErrorCommandResponse()
                {
                    Message = ex.Message
                };
            }
            catch (Exception ex)
            {
                return new LoginUserErrorCommandResponse()
                {
                    Message = "Sunucu hatası: " + ex.Message
                };
            }
        }

    }
}
