import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificIngresadosComponent } from './notific-ingresados.component';

describe('NotificIngresadosComponent', () => {
  let component: NotificIngresadosComponent;
  let fixture: ComponentFixture<NotificIngresadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificIngresadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificIngresadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
