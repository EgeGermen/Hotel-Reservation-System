import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KullaniciLoginComponent } from './kullanici-login.component';

describe('KullaniciLoginComponent', () => {
  let component: KullaniciLoginComponent;
  let fixture: ComponentFixture<KullaniciLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KullaniciLoginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KullaniciLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
