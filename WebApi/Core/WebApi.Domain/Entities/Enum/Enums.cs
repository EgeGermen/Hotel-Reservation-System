using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebApi.Domain.Entities.Enum
{
    // Enum kullanmak istiyorsan bunları parçalayabilirsin
    // Rezervasyonun durumu: onaylandi, iptal vb.


    public enum OdaTipi
    {
        Standart,
        Suit,
        Deluxe,
        Ekonomik
    }
    public enum RezervasyonDurumu
    {
        Onaylandi,
        IptalEdildi,
        Tamamlandi
    }

    // Odeme yontemi
    public enum OdemeYontemi
    {
        KrediKart,
        Nakit,
        Online
    }

    // Odeme durumunu takip etmek icin
    public enum OdemeDurumu
    {
        Beklemede,
        Odendi,
        Basarisiz
    }
}
