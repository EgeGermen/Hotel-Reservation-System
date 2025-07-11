using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebApi.Persistence
{
    static class Configurations
    {
        static public string ConnectionString
        {
            get
            {


                ConfigurationManager configrationManager = new(); //Bu sınıfı yazdık ve appsettings.json dosyasını okumak için kullanıcaz
                configrationManager.SetBasePath(Path.Combine(Directory.GetCurrentDirectory(), "../../Presentation/WebApi.Api")); //Bu kısımda base path i ayarlıyoruz, yani uygulamanın çalıştığı dizini ayarlıyoruz.
                configrationManager.AddJsonFile("appsettings.json"); //Bu dosyayı ekledik ve bu dosyadan veriyi okuyabilmemiz için gerekli ayarları yaptık


                var connStr = configrationManager.GetConnectionString("PostgreSql");
                if (connStr == null)
                    throw new InvalidOperationException("PostgreSql bağlantı dizesi bulunamadı!");
                return connStr;

            }

        }
    }
}
