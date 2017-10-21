import {Component, OnInit, ViewChild} from '@angular/core';
import {ParqueEstacionamiento} from '../../shared/domain/parqueEstacionamiento';
import {Subject} from 'rxjs/Subject';
import {DataTableDirective} from 'angular-datatables';
import {ApiService} from '../../shared/services/api.service';
import {Reserva} from '../../shared/domain/reserva';

@Component({
  selector: 'app-historial-reservas',
  templateUrl: './historial-reservas.component.html',
  styleUrls: ['./historial-reservas.component.scss']
})
export class HistorialReservasComponent implements OnInit {

    historialReservas: Reserva[] = [];
    ocultarTabla = true;
    @ViewChild(DataTableDirective)
    dtElement: DataTableDirective;
    dtOptions: any = {};
    dtTrigger: Subject<any> = new Subject();
    parque: ParqueEstacionamiento;

  constructor(private apiService: ApiService) {
      this.parque = JSON.parse(localStorage.getItem('currentParking'));
      this.apiService.get('/reserva/all/parque/' + this.parque.idEstacionamiento).subscribe( json => {
          this.historialReservas = json;
          console.log(this.historialReservas);
      });
  }

  ngOnInit() {
  }

}
