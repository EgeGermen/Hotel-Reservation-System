import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestekIletisimComponent } from './destek-iletisim.component';

describe('DestekIletisimComponent', () => {
  let component: DestekIletisimComponent;
  let fixture: ComponentFixture<DestekIletisimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DestekIletisimComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DestekIletisimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
