import {Component, OnInit} from '@angular/core';
import {IngresoVehiculo} from '../../shared/domain/ingresoVehiculo';
import {Vehiculo} from '../../shared/domain/vehiculo';
import {ParqueEstacionamiento} from '../../shared/domain/parqueEstacionamiento';

@Component({
  selector: 'app-ingreso-vehiculos',
  templateUrl: './ingreso-vehiculos.component.html',
  styleUrls: ['./ingreso-vehiculos.component.scss']
})
export class IngresoVehiculosComponent implements OnInit {
    ingreso: IngresoVehiculo = new IngresoVehiculo();
    vehiculo: Vehiculo = new Vehiculo();
    parque: ParqueEstacionamiento;
    submitted = false;
    submittedExitoso = false;

  constructor() {
      this.parque = JSON.parse(localStorage.getItem('currentParking'));
  }

  ngOnInit() {
  }

  onSubmitClicked() {
      this.submitted = true;
      // TODO borrar esta linea
      this.submittedExitoso = !this.submittedExitoso;

      // TODO setear parque y vehiculo en Ingreso antes de mandalo a la API
  }

}
