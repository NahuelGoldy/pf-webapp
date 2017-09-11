import { Component, OnInit } from '@angular/core';
import {IngresoVehiculo} from '../../shared/domain/ingresoVehiculo';
import {ParqueEstacionamiento} from '../../shared/domain/parqueEstacionamiento';
import {ApiService} from '../../shared/services/api.service';
import {routerTransition} from '../../router.animations';
import {Egreso} from '../../shared/domain/egreso';

@Component({
  selector: 'app-egreso-vehiculos',
  templateUrl: './egreso-vehiculos.component.html',
  styleUrls: ['./egreso-vehiculos.component.scss'],
  animations: [routerTransition()]
})
export class EgresoVehiculosComponent implements OnInit {

    ingreso: IngresoVehiculo = new IngresoVehiculo();
    egreso: Egreso = new Egreso();
    parque: ParqueEstacionamiento;
    closeAlert = false;
    submittedExitoso = false;
    submittedFallido = false;
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
          this.nroPatente = this.nroPatente.toUpperCase();
          this.apiService.get('ingreso/' + this.parque.idEstacionamiento + '/vehiculo/' + this.nroPatente)
              .subscribe(json => {
                  this.ingreso = json;
              });
      }
    }

    onSubmitClicked(f) {
        this.closeAlert = false;
        this.submitted = true;
        this.nroPatente = this.nroPatente.toUpperCase();

        try {
            this.apiService.put('ingreso/' + this.parque.idEstacionamiento + '/egresoVehiculo/' + this.nroPatente, null)
                .subscribe(json => {
                    this.egreso = json;
                    this.submittedExitoso = true;
                    this.submittedFallido = false;
                });
        } catch (e) {
            this.submittedFallido = true;
            this.submittedExitoso = false;
        } finally {
            this.clean(f);
            this.submitted = false;
        }
    }

    private calcularCantHoras(egreso: IngresoVehiculo): number {
        const re = '-/g';
        const fechaIngreso = egreso.fechaIngreso.replace(re, '/');
        const fechaEgreso = egreso.fechaEgreso.replace(re, '/');
        return (Math.ceil((new Date(fechaEgreso).getTime() - new Date(fechaIngreso).getTime()) / (60 * 60 * 1000)));
    }

    private calcularTiempoEstadia(egreso: IngresoVehiculo): string {
        const re = '-/g';
        const fechaIngreso = egreso.fechaIngreso.replace(re, '/');
        const fechaEgreso = egreso.fechaEgreso.replace(re, '/');
        const diffMillis = new Date(fechaEgreso).getTime() - new Date(fechaIngreso).getTime();
        let seconds = diffMillis / 1000;
        let minutes = seconds / 60;
        seconds %= 60;
        const hours = minutes / 60;
        minutes %= 60;
        return Math.round(hours) + ':' + ('0' + Math.round(minutes)).slice(-2) + ':' + ('0' + Math.round(seconds)).slice(-2);
    }

    private calcularCosto(cantHoras): number {
        return (cantHoras * this.parque.precioPorHora);
    }

    private clean(f) {
        f.form.reset();
    }

}
