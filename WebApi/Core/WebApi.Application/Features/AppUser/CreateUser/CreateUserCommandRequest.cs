using MediatR;


namespace WebApi.Application.Features.Commands.AppUser.CreateUser
{
    public class CreateUserCommandRequest : IRequest<CreateUserCommandResponse>
    {
        public string KayitAd { get; set; } = null!;

        public string KayitEmail { get; set; } = null!;

        public string KayitSifre { get; set; }

        public string KayitSifreTekrar { get; set; }
    }
}
