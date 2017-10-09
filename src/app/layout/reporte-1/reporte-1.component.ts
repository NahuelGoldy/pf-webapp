import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../shared/services/api.service";
import {IngresoVehiculo} from "../../shared/domain/ingresoVehiculo";
import {ParametroReporte} from "../../shared/domain/parametroReporte";
import {ParqueEstacionamiento} from "../../shared/domain/parqueEstacionamiento";

@Component({
  selector: 'app-reporte-1',
  templateUrl: './reporte-1.component.html',
  styleUrls: ['./reporte-1.component.scss']
})
export class Reporte1Component implements OnInit {
    modelDesde: any;
    modelHasta: any;
    modelIntervalo: string;
    ingresos: IngresoVehiculo[];

    // lineChart
    public lineChartData: Array<any> = [
        // TODO (harcodeado para estetica), refactorizar
        { data: [87, 61, 40, 55, 23, 0, 5, 5, 64], label: '% ocupación' }
    ];
    public chartLabels: Array<any> = ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00'];
    public lineChartLabels: Array<any> = [];
    public lineChartOptions: any = {
        responsive: true
    };
    public lineChartColors: Array<any> = [
        {
            backgroundColor: 'rgba(77,83,96,0.2)',
            borderColor: 'rgba(77,83,96,1)',
            pointBackgroundColor: 'rgba(77,83,96,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(77,83,96,1)'
        }
    ];
    public lineChartLegend = true;
    public lineChartType = 'line';

  constructor(private apiService: ApiService) { }

  ngOnInit() {
  }

    chartHovered(event: Event) {

    }

    chartClicked(event: Event ) {

    }

    onGenerateClick() {
      const fechaDesde =
          ('0' + this.modelDesde.day).slice(-2) + '/' +
          ('0' + this.modelDesde.month).slice(-2) + '/' +
          this.modelDesde.year;
      const fechaHasta =
            ('0' + this.modelHasta.day).slice(-2) + '/' +
            ('0' + this.modelHasta.month).slice(-2) + '/' +
            this.modelHasta.year;
      const parametro = new ParametroReporte();
      let parque = new ParqueEstacionamiento;
      parametro.fechaFinal = fechaHasta;
      parametro.fechaInicial = fechaDesde;
      parque =  JSON.parse(localStorage.getItem('currentParking'));
      parametro.idEstacionamiento = parque.idEstacionamiento;
      console.log(localStorage.getItem('currentParking'));
      this.apiService.post('ingreso/ingresoVehiculo/allByFechas', parametro).subscribe(
          (data) => {
              this.ingresos = data;
          }
      );


    }
}
