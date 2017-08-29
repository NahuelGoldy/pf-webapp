import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresoVehiculosComponent } from './ingreso-vehiculos.component';

describe('IngresoVehiculosComponent', () => {
  let component: IngresoVehiculosComponent;
  let fixture: ComponentFixture<IngresoVehiculosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngresoVehiculosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngresoVehiculosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
