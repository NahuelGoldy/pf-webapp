import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialIngresosEgresosComponent } from './historial-ingresos-egresos.component';

describe('HistorialIngresosEgresosComponent', () => {
  let component: HistorialIngresosEgresosComponent;
  let fixture: ComponentFixture<HistorialIngresosEgresosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistorialIngresosEgresosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorialIngresosEgresosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
