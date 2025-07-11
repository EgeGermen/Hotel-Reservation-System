
namespace WebApi.Application.Abstractions.Token
{
    public interface ITokenHandler
    {
        DTOss.Token CreateAccessToken(int minute);
    }
}
