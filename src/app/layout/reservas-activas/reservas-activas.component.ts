import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../shared/services/api.service';
import {ParqueEstacionamiento} from '../../shared/domain/parqueEstacionamiento';
import {Reserva} from '../../shared/domain/reserva';
import {routerTransition} from '../../router.animations';

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

  constructor(private apiService: ApiService) {
      this.parque = JSON.parse(localStorage.getItem('currentParking'));
      this.apiService.get('/reserva/all/parque/activas/' + this.parque.idEstacionamiento).subscribe( json => {
          this.showLoading = false;
          this.reservasActivas = json;
          console.log(this.reservasActivas);
      });
  }

  ngOnInit() {
  }

}
