import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RezervasyonOnayComponent } from './rezervasyon-onay.component';

describe('RezervasyonOnayComponent', () => {
  let component: RezervasyonOnayComponent;
  let fixture: ComponentFixture<RezervasyonOnayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RezervasyonOnayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RezervasyonOnayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
