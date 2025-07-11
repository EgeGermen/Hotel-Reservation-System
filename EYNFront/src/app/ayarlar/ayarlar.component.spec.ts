import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AyarlarComponent } from './ayarlar.component';

describe('AyarlarComponent', () => {
  let component: AyarlarComponent;
  let fixture: ComponentFixture<AyarlarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AyarlarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AyarlarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
