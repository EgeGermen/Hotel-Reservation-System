namespace WebApi.Api.Dtos.OdaTipi
{
    public class OdaTipiDto
    {
        public int Id { get; set; }
        public string OdaTipiAdi { get; set; }
        public string Aciklama { get; set; }
        public int OtelId { get; set; }
        public int Kapasite { get; set; }
        public decimal Fiyat { get; set; }
        public double? IndirimOrani  { get; set; }
    }
} 