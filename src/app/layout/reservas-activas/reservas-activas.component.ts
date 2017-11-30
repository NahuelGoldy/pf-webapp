import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../shared/services/api.service';
import {ParqueEstacionamiento} from '../../shared/domain/parqueEstacionamiento';
import {Reserva} from '../../shared/domain/reserva';
import {routerTransition} from '../../router.animations';
import {Router} from '@angular/router';
import {User} from '../../shared/domain/usuario';

@Component({
  selector: 'app-reservas-activas',
  templateUrl: './reservas-activas.component.html',
  styleUrls: ['./reservas-activas.component.scss'],
  animations: [routerTransition()]
})
export class ReservasActivasComponent implements OnInit {

    parque: ParqueEstacionamiento;
    reservasActivas: Reserva[] = [];
    showLoading = true;

  constructor(private apiService: ApiService,
              private router: Router) {
      this.parque = JSON.parse(localStorage.getItem('currentParking'));
      /*this.apiService.get('/reserva/all/parque/activas/' + this.parque.idEstacionamiento).subscribe( json => {
          this.showLoading = false;
          this.reservasActivas = json;
      });*/

      const reservaCode = new Reserva();
      reservaCode.usuario = new User();
      reservaCode.usuario.nombre = 'Nahuel';
      reservaCode.usuario.apellido = 'Goldy';
      reservaCode.usuario.email = 'nahuel_elMVP@gmail.com';
      reservaCode.nroPatente = 'KGB856';
      reservaCode.horaCreacionReserva = new Date().getUTCHours().toLocaleString();
      const reservaCode2 = new Reserva();
      reservaCode2.usuario = new User();
      reservaCode2.usuario.nombre = 'Federico';
      reservaCode2.usuario.apellido = 'Madoery';
      reservaCode2.nroPatente = 'SSS874';
      reservaCode2.usuario.email = 'fede_madoery@gmail.com';
      reservaCode2.horaCreacionReserva = new Date().getUTCHours().toLocaleString();
      const reservaCode3 = new Reserva();
      reservaCode3.usuario = new User();
      reservaCode3.usuario.nombre = 'Agustin';
      reservaCode3.usuario.apellido = 'Pane';
      reservaCode3.nroPatente = 'RDF635';
      reservaCode3.usuario.email = 'Pane_elaleman@gmail.com';
      reservaCode3.horaCreacionReserva = new Date().getUTCHours().toLocaleString();
      this.reservasActivas.push(reservaCode);
      this.reservasActivas.push(reservaCode2);
      this.reservasActivas.push(reservaCode3);
      this.showLoading = false;
      console.log(this.reservasActivas);
  }

  ngOnInit() {

  }

    removeReserva(index) {
        this.reservasActivas.splice(index, 1);
    }


    confirmarReserva(reserva: Reserva) {
      const reservaString = JSON.stringify(reserva);
        localStorage.setItem('confirmarReserva', reservaString);
        return this.router.navigate(['/ingreso-egreso/ingreso']);
    }
}
