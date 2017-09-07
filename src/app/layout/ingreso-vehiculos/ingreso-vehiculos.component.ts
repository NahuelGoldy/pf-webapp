import {Component, OnInit} from '@angular/core';
import {ParqueEstacionamiento} from '../../shared/domain/parqueEstacionamiento';
import {ApiService} from '../../shared/services/api.service';
import {Ingreso} from '../../shared/domain/ingreso';
import {routerTransition} from '../../router.animations';

@Component({
  selector: 'app-ingreso-vehiculos',
  templateUrl: './ingreso-vehiculos.component.html',
  styleUrls: ['./ingreso-vehiculos.component.scss'],
  animations: [routerTransition()]
})
export class IngresoVehiculosComponent implements OnInit {
    ing: Ingreso = new Ingreso();
    parque: ParqueEstacionamiento;
    showOptional = false;
    submitted = false;
    submittedExitoso = false;
    submittedFallido = false;
    patenteREGEX = /([A-Z]{3}|[a-z]{3})[0-9]{3}|[A-Z]{2}[0-9]{3}[A-Z]{2}/;

  constructor(public apiService: ApiService) {
      this.parque = JSON.parse(localStorage.getItem('currentParking'));
  }

  ngOnInit() {
  }

  toggleShowOptional() {
      this.showOptional = !this.showOptional;
  }

    onCleanClicked() {
        this.ing = new Ingreso();
    }

  onSubmitClicked() {
      this.submitted = true;
      // TODO borrar esta linea
      this.submittedExitoso = !this.submittedExitoso;

      this.ing.nroPatente = this.ing.nroPatente.toUpperCase();
      const now = new Date();
      const nowString = now.getFullYear() + '-' + ('0' + now.getMonth()).slice(-2) + '-' + ('0' + now.getDay()).slice(-2) + ' ' +
          ('0' + now.getHours()).slice(-2) + ':' + ('0' + now.getMinutes()).slice(-2) + ':' + ('0' + now.getSeconds()).slice(-2);

      this.ing.idEstacionamiento = this.parque.idEstacionamiento;

      this.apiService.post('ingreso/ingresoVehiculo/' + this.parque.idEstacionamiento, this.ing)
          .subscribe( json => {
              this.submittedExitoso = true;
              this.onCleanClicked();
          });
      // TODO manejar si la response trae error (setear submittedFallido = true)
  }

}
