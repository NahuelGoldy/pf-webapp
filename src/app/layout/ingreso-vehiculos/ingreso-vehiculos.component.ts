import {Component, OnInit} from '@angular/core';
import {IngresoVehiculo} from '../../shared/domain/ingresoVehiculo';

@Component({
  selector: 'app-ingreso-vehiculos',
  templateUrl: './ingreso-vehiculos.component.html',
  styleUrls: ['./ingreso-vehiculos.component.scss']
})
export class IngresoVehiculosComponent implements OnInit {
    ingreso: IngresoVehiculo = new IngresoVehiculo();
    submitted = false;
    submittedExitoso = false;
    closeAlert = false;

  constructor() { }

  ngOnInit() {
  }

  onSubmitClicked() {
      this.submitted = true;
      this.submittedExitoso = true;
      this.closeAlert = false;
  }

}
