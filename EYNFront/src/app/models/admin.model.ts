export interface Admin {
  id: number;
  kullaniciAdi: string;
}

export interface AdminCreate {
  kullaniciAdi: string;
  sifre: string;
}

export interface AdminUpdate {
  id: number;
  kullaniciAdi: string;
  sifre?: string;
}

export interface AdminLogin {
  kullaniciAdi: string;
  sifre: string;
}
