import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KullaniciGirisComponent } from './kullanici-giris.component';

describe('KullaniciGirisComponent', () => {
  let component: KullaniciGirisComponent;
  let fixture: ComponentFixture<KullaniciGirisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KullaniciGirisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KullaniciGirisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
