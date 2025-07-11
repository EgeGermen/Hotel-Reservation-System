import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KullaniciPanelComponent } from './kullanici-panel.component';

describe('KullaniciPanelComponent', () => {
  let component: KullaniciPanelComponent;
  let fixture: ComponentFixture<KullaniciPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KullaniciPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KullaniciPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
