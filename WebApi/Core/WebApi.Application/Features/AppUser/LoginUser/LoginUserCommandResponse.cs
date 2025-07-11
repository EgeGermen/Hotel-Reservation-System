using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApi.Application.DTOss;

namespace WebApi.Application.Features.AppUser.LoginUser
{
    public class LoginUserCommandResponse
    {
        
        
    }

    public class LoginUserSuccessCommandResponse : LoginUserCommandResponse
    {
        public Token Token { get; set; }
        public UserDto User { get; set; } // Kullanıcı bilgisi eklendi
    }
    public class LoginUserErrorCommandResponse : LoginUserCommandResponse
    {
        public string Message { get; set; }
    }

    // UserDto tanımı
    public class UserDto
    {
        public string Id { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string AdiSoyadi { get; set; }
    }
}
