import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtelYonetimiComponent } from './otel-yonetimi.component';

describe('OtelYonetimiComponent', () => {
  let component: OtelYonetimiComponent;
  let fixture: ComponentFixture<OtelYonetimiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OtelYonetimiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtelYonetimiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
