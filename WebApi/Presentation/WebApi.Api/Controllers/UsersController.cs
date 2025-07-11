using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using WebApi.Api.Dtos.AppUser;
using WebApi.Api.Dtos.Odeme;
using WebApi.Api.Dtos.Rezervasyon;
using WebApi.Application.Abstractions;
using WebApi.Application.Features.AppUser.LoginUser;
using WebApi.Application.Features.Commands.AppUser.CreateUser;
using WebApi.Domain.Entities;
using WebApi.Domain.Entities.Identity;

/// <summary>
/// Kullanıcı işlemleri için API controller.
/// </summary>
[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private readonly IMediator _mediator;
    private readonly UserManager<AppUser> _userManager;
    private readonly IRezervasyonService _rezervasyonService;
    private readonly IOdemeService _odemeService;

    public UsersController(IMediator mediator, UserManager<AppUser> userManager, IRezervasyonService rezervasyonService, IOdemeService odemeService)
    {
        _mediator = mediator;
        _userManager = userManager;
        _rezervasyonService = rezervasyonService;
        _odemeService = odemeService;
    }

    /// <summary>
    /// Yeni kullanıcı oluşturur.
    /// </summary>
    /// <param name="createUserCommandRequest">Kullanıcı oluşturma isteği</param>
    /// <returns>Oluşturulan kullanıcıya dair bilgi</returns>
    [HttpPost]
    public async Task<IActionResult> CreateUser(CreateUserCommandRequest createUserCommandRequest)
    {
        CreateUserCommandResponse response = await _mediator.Send(createUserCommandRequest);
        return Ok(response);
    }

    /// <summary>
    /// Tüm kullanıcıları listeler.
    /// </summary>
    /// <returns>Kullanıcı listesi</returns>
    [HttpGet]
    public IActionResult GetAll()
    {
        return Ok(_userManager.Users.ToList());
    }

    /// <summary>
    /// Belirli bir kullanıcıyı Id ile getirir.
    /// </summary>
    /// <param name="id">Kullanıcı Id</param>
    /// <returns>Kullanıcı bilgisi</returns>
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(string id)
    {
        var user = await _userManager.FindByIdAsync(id);
        if (user == null) return NotFound();
        return Ok(user);
    }

    /// <summary>
    /// Kullanıcıyı günceller.
    /// </summary>
    /// <param name="id">Kullanıcı Id</param>
    /// <param name="updateUser">Güncellenecek kullanıcı bilgisi</param>
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(string id, [FromBody] AppUser updateUser)
    {
        var user = await _userManager.FindByIdAsync(id);
        if (user == null) return NotFound();
        user.AdiSoyadi = updateUser.AdiSoyadi;
        user.Email = updateUser.Email;
        var result = await _userManager.UpdateAsync(user);
        if (!result.Succeeded) return BadRequest(result.Errors);
        return NoContent();
    }

    /// <summary>
    /// Kullanıcıyı siler.
    /// </summary>
    /// <param name="id">Kullanıcı Id</param>
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(string id)
    {
        var user = await _userManager.FindByIdAsync(id);
        if (user == null) return NotFound();
        var result = await _userManager.DeleteAsync(user);
        if (!result.Succeeded) return BadRequest(result.Errors);
        return NoContent();
    }

    /// <summary>
    /// Kullanıcının tüm rezervasyonlarını getirir.
    /// </summary>
    /// <param name="id">Kullanıcı Id</param>
    /// <returns>Rezervasyon listesi</returns>
    [HttpGet("{id}/reservations")]
    public async Task<IActionResult> GetReservationsByUser(string id)
    {
        var reservations = await _rezervasyonService.MusterininRezervasyonlariniGetirAsync(id);
        var result = reservations.Select(r => new RezervasyonDto
        {
            Id = r.Id,
            AppUserId = r.AppUserId,
            OdaTipiId = r.OdaTipiId,
            GirisTarihi = r.GirisTarihi,
            CikisTarihi = r.CikisTarihi,
            RezervasyonTarihi = r.RezervasyonTarihi,
            Durum = r.Durum.ToString(),
            ToplamUcret = r.ToplamUcret
        }).ToList();
        return Ok(result);
    }

    /// <summary>
    /// Kullanıcının tüm ödeme kayıtlarını getirir.
    /// </summary>
    /// <param name="id">Kullanıcı Id</param>
    /// <returns>Ödeme listesi</returns>
    [HttpGet("{id}/payments")]
    public async Task<IActionResult> GetPaymentsByUser(string id)
    {
        var payments = await _odemeService.KullanicininOdemeleriniGetirAsync(id);
        var result = payments.Select(o => new OdemeDto
        {
            Id = o.Id,
            RezervasyonId = o.RezervasyonId,
            Tutar = o.Tutar,
            OdemeTarihi = o.OdemeTarihi,
            Yontem = o.Yontem.ToString(),
            Durum = o.Durum.ToString()
        }).ToList();
        return Ok(result);
    }

    /// <summary>
    /// Kullanıcının şifresini değiştirir.
    /// </summary>
    /// <param name="id">Kullanıcı Id</param>
    /// <param name="dto">Eski ve yeni şifre</param>
    [Authorize]
    [HttpPost("{id}/changepassword")]
    public async Task<IActionResult> ChangePassword(string id, [FromBody] ChangePasswordDto dto)
    {
        var user = await _userManager.FindByIdAsync(id);
        if (user == null) return NotFound();

        // Sadece kendi şifresini değiştirebilsin (veya admin)
        if (User.Identity.Name != user.UserName && !User.IsInRole("Admin"))
            return Forbid();

        var result = await _userManager.ChangePasswordAsync(user, dto.OldPassword, dto.NewPassword);
        if (!result.Succeeded) return BadRequest(result.Errors);
        return NoContent();
    }

    /// <summary>
    /// Kullanıcı ayarlarını getirir.
    /// </summary>
    [HttpGet("{id}/settings")]
    public async Task<IActionResult> GetSettings(string id)
    {
        var user = await _userManager.FindByIdAsync(id);
        if (user == null) return NotFound();
        return Ok(new UserSettingsDto
        {
            AdiSoyadi = user.AdiSoyadi,
            Email = user.Email
        });
    }

    /// <summary>
    /// Kullanıcı ayarlarını günceller.
    /// </summary>
    [HttpPut("{id}/settings")]
    public async Task<IActionResult> UpdateSettings(string id, [FromBody] UserSettingsDto dto)
    {
        var user = await _userManager.FindByIdAsync(id);
        if (user == null) return NotFound();
        user.AdiSoyadi = dto.AdiSoyadi;
        user.Email = dto.Email;
        var result = await _userManager.UpdateAsync(user);
        if (!result.Succeeded) return BadRequest(result.Errors);
        return NoContent();
    }


    //login talebi 
    [HttpPost("[action]")]
    public async Task<IActionResult> Login(LoginUserCommandRequest loginUserCommandRequest)
    {
        LoginUserCommandResponse response = await _mediator.Send(loginUserCommandRequest);
        return Ok(response);
    }



}
