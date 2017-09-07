import { Component, OnInit } from '@angular/core';
import {IngresoVehiculo} from '../../shared/domain/ingresoVehiculo';
import {ParqueEstacionamiento} from '../../shared/domain/parqueEstacionamiento';
import {ApiService} from '../../shared/services/api.service';
import {routerTransition} from '../../router.animations';

@Component({
  selector: 'app-egreso-vehiculos',
  templateUrl: './egreso-vehiculos.component.html',
  styleUrls: ['./egreso-vehiculos.component.scss'],
  animations: [routerTransition()]
})
export class EgresoVehiculosComponent implements OnInit {

    ingreso: IngresoVehiculo = new IngresoVehiculo();
    parque: ParqueEstacionamiento;
    closeAlert = false;
    submittedExitoso = false;
    submitted = false;
    nroPatente;
    patenteREGEX = /([A-Z]{3}|[a-z]{3})[0-9]{3}|[A-Z]{2}[0-9]{3}[A-Z]{2}/;

  constructor(public apiService: ApiService) {
      this.parque = JSON.parse(localStorage.getItem('currentParking'));
  }

    ngOnInit() {
    }

    onPatenteChange() {
      if (this.patenteREGEX.test(this.nroPatente)) {
          this.apiService.get('ingreso/' + this.parque.idEstacionamiento + '/vehiculo/' + this.nroPatente)
              .subscribe(json => {
                  this.ingreso = json;
              });
      }
    }

    onSubmitClicked() {
        this.closeAlert = false;
        this.submittedExitoso = true;
        this.submitted = true;

        this.apiService.put('ingreso/' + this.parque.idEstacionamiento + '/egresoVehiculo/' + this.nroPatente, null)
            .subscribe(json => {
                console.log(json);
            });
    }

    private calcularCosto(): number {
      const fechaIngreso = this.ingreso.fechaIngreso.replace('-', '/');
      const cantHoras = Math.ceil((Date.now() - new Date(fechaIngreso).getMilliseconds()) / (60 * 60 * 1000));
      return (cantHoras * this.parque.precioPorHora);
    }

    private clean() {
    }

}
