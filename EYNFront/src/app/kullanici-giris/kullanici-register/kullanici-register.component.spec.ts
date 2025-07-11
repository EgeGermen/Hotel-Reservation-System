import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KullaniciRegisterComponent } from './kullanici-register.component';

describe('KullaniciRegisterComponent', () => {
  let component: KullaniciRegisterComponent;
  let fixture: ComponentFixture<KullaniciRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KullaniciRegisterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KullaniciRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
