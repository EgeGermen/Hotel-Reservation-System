import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtelFiltreComponent } from './otel-filtre.component';

describe('OtelFiltreComponent', () => {
  let component: OtelFiltreComponent;
  let fixture: ComponentFixture<OtelFiltreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OtelFiltreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtelFiltreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
