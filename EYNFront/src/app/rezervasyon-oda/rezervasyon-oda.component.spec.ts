import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RezervasyonOdaComponent } from './rezervasyon-oda.component';

describe('RezervasyonOdaComponent', () => {
  let component: RezervasyonOdaComponent;
  let fixture: ComponentFixture<RezervasyonOdaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RezervasyonOdaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RezervasyonOdaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
