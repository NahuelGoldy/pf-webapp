import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-historial-ingresos-egresos',
  templateUrl: './historial-ingresos-egresos.component.html',
  styleUrls: ['./historial-ingresos-egresos.component.scss']
})
export class HistorialIngresosEgresosComponent implements OnInit {

    historial: Array<any> = [];
  constructor() { }

  ngOnInit() {
  }

}
