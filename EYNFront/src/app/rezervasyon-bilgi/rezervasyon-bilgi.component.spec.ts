import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RezervasyonBilgiComponent } from './rezervasyon-bilgi.component';

describe('RezervasyonBilgiComponent', () => {
  let component: RezervasyonBilgiComponent;
  let fixture: ComponentFixture<RezervasyonBilgiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RezervasyonBilgiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RezervasyonBilgiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
