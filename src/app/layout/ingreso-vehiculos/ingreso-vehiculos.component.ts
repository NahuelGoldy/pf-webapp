import {Component, OnInit} from '@angular/core';
import {ParqueEstacionamiento} from '../../shared/domain/parqueEstacionamiento';
import {ApiService} from '../../shared/services/api.service';
import {Ingreso} from '../../shared/domain/ingreso';
import {routerTransition} from '../../router.animations';
import {Reserva} from "../../shared/domain/reserva";

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
      const reservaString = localStorage.getItem('confirmarReserva');
      if (reservaString) {
           const reservaConfimada: Reserva = JSON.parse(reservaString);
           this.ing.apellidoCliente = reservaConfimada.usuario.apellido;
           this.ing.nombreCliente = reservaConfimada.usuario.nombre;
           this.ing.mailCliente = reservaConfimada.usuario.email;
           this.ing.nroPatente = reservaConfimada.nroPatente;
           localStorage.removeItem('confirmarReserva');
      }
  }

  toggleShowOptional() {
      this.showOptional = !this.showOptional;
  }

    onCleanClicked(f) {
        this.ing = new Ingreso();
        f.form.reset();
    }

  onSubmitClicked(f) {
      this.submitted = true;

      this.ing.nroPatente = this.ing.nroPatente.toUpperCase();
      const now = new Date();
      const nowString = now.getFullYear() + '-' + ('0' + now.getMonth()).slice(-2) + '-' + ('0' + now.getDay()).slice(-2) + ' ' +
          ('0' + now.getHours()).slice(-2) + ':' + ('0' + now.getMinutes()).slice(-2) + ':' + ('0' + now.getSeconds()).slice(-2);

      this.ing.idEstacionamiento = this.parque.idEstacionamiento;

      try {
          this.apiService.post('ingreso/ingresoVehiculo/' + this.parque.idEstacionamiento, this.ing)
              .subscribe( () => {
                  this.submittedExitoso = true;
                  this.submittedFallido = false;
              });
      } catch (e) {
          this.submittedFallido = true;
          this.submittedExitoso = false;
      } finally {
          this.onCleanClicked(f);
          this.submitted = false;
      }
  }

}
