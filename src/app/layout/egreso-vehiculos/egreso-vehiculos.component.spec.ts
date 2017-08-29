import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EgresoVehiculosComponent } from './egreso-vehiculos.component';

describe('EgresoVehiculosComponent', () => {
  let component: EgresoVehiculosComponent;
  let fixture: ComponentFixture<EgresoVehiculosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EgresoVehiculosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EgresoVehiculosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
