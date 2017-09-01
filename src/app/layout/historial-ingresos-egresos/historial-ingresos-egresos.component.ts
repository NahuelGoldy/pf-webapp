import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../shared/services/api.service';
import {IngresoVehiculo} from '../../shared/domain/ingresoVehiculo';

@Component({
  selector: 'app-historial-ingresos-egresos',
  templateUrl: './historial-ingresos-egresos.component.html',
  styleUrls: ['./historial-ingresos-egresos.component.scss']
})
export class HistorialIngresosEgresosComponent implements OnInit {

    ingreso: IngresoVehiculo = new IngresoVehiculo();
    historial: IngresoVehiculo[] = [];

  constructor(public apiService: ApiService) {
      // TODO IMPORTANTISIMO!!! Mandar el id del parque de estacionamiento! (descomentar y borrar la linea en uso actual)
      const id = JSON.parse(localStorage.getItem('currentParking')).idEstacionamiento;
      // this.apiService.get('ingreso/' + id).subscribe( json => {
      this.apiService.get('ingreso/13').subscribe( json => {
          json.forEach(i => this.historial.push(i));
      });
  }

  ngOnInit() {
  }

}
