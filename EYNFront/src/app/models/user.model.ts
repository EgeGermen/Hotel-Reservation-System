export interface User {
  id: string;
  userName: string; // Email ile aynı değer (IdentityUser'dan)
  email: string;    // Email adresi
  adiSoyadi: string; // Gerçek ad soyad
  telefon?: string; // Telefon numarası (opsiyonel)
}

export interface UserCreate {
  KayitAd: string; // CreateUserCommandRequest'teki alan adı (AdiSoyadi olacak)
  KayitEmail: string; // Email ve UserName olacak
  KayitSifre: string;
  KayitSifreTekrar: string;
}

export interface UserUpdate {
  id: string;
  adiSoyadi: string;
  email: string;
  telefon?: string;
}

export interface ChangePassword {
  oldPassword: string;
  newPassword: string;
}

export interface UserSettings {
  adiSoyadi: string;
  email: string;
  telefon?: string;
} 