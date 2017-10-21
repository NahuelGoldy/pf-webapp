import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservasActivasComponent } from './reservas-activas.component';

describe('ReservasActivasComponent', () => {
  let component: ReservasActivasComponent;
  let fixture: ComponentFixture<ReservasActivasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservasActivasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservasActivasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
