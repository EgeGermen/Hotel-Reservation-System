namespace WebApi.Api.Dtos.AppUser
{
    public class ChangePasswordDto
    {
        public string OldPassword { get; set; }
        public string NewPassword { get; set; }
    }
} 