import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtelDetayComponent } from './otel-detay.component';

describe('OtelDetayComponent', () => {
  let component: OtelDetayComponent;
  let fixture: ComponentFixture<OtelDetayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OtelDetayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtelDetayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
