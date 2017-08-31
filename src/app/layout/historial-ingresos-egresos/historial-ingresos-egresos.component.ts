import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-historial-ingresos-egresos',
  templateUrl: './historial-ingresos-egresos.component.html',
  styleUrls: ['./historial-ingresos-egresos.component.scss']
})
export class HistorialIngresosEgresosComponent implements OnInit {

    historial: [{
        nroPatente: string,
        montoAbonado: string,
        horasEstacionadas: string,
        fechaEstadia: string,
        nombreCliente: string,
        telefonoCliente: string
    }];
  constructor() {
      this.historial = [{
          nroPatente: 'AAA555',
          montoAbonado: '54$',
          horasEstacionadas: '2Hs',
          fechaEstadia: '30/12/1874',
          nombreCliente: 'Pedro',
          telefonoCliente: '434343434'
      },
          {
              nroPatente: 'AAA556',
              montoAbonado: '54$',
              horasEstacionadas: '2Hs',
              fechaEstadia: '30/12/1874',
              nombreCliente: 'Pedro2',
              telefonoCliente: '434343434'
          },
          {
              nroPatente: 'AAA557',
              montoAbonado: '54$',
              horasEstacionadas: '2Hs',
              fechaEstadia: '30/12/1874',
              nombreCliente: 'Pedro3',
              telefonoCliente: '434343434'
          },
          {
              nroPatente: 'AAA558',
              montoAbonado: '54$',
              horasEstacionadas: '2Hs',
              fechaEstadia: '30/12/1874',
              nombreCliente: 'Pedro4',
              telefonoCliente: '434343434'
          }];
  }

  ngOnInit() {
  }

}
