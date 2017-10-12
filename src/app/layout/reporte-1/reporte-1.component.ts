import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../shared/services/api.service';
import {IngresoVehiculo} from '../../shared/domain/ingresoVehiculo';
import {ParametroReporte} from '../../shared/domain/parametroReporte';
import {ParqueEstacionamiento} from '../../shared/domain/parqueEstacionamiento';
import {IMyDpOptions} from 'mydatepicker';
import {DateserviceService} from '../../shared/services/dateservice.service';

@Component({
  selector: 'app-reporte-1',
  templateUrl: './reporte-1.component.html',
  styleUrls: ['./reporte-1.component.scss']
})
export class Reporte1Component implements OnInit {
    modelDesde: any;
    modelHasta: any;
    modelIntervalo = '';
    disableAnos = true;
    disableMes = true;
    disableHoras = true;
    disableDias = true;
    disableSemanas = true;

    ingresos: IngresoVehiculo[];
    myDatePickerOptions: IMyDpOptions;

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
    public today = new Date();
    public showAlert = false;

  constructor(private apiService: ApiService, private dateService: DateserviceService) { }

  ngOnInit() {
      this.myDatePickerOptions = {
          // other options...
          dateFormat: 'dd/mm/yyyy',
          dayLabels: {su: 'Dom', mo: 'Lun', tu: 'Mar', we: 'Mié', th: 'Jue', fr: 'Vie', sa: 'Sáb'},
          monthLabels: {1: 'Ene', 2: 'Feb', 3: 'Mar', 4: 'Abr', 5: 'May', 6: 'Jun',
              7: 'Jul', 8: 'Ago', 9: 'Sep', 10: 'Oct', 11: 'Nov', 12: 'Dic'},
          todayBtnTxt: 'Hoy',
          showClearDateBtn: false,
          editableDateField: false,
          openSelectorOnInputClick: true,
          alignSelectorRight: true,
      };

      const options = JSON.parse(JSON.stringify(this.myDatePickerOptions));
      const fecha = new Date(this.today.getTime() + 86400000);
      console.log(fecha);
      options.disableSince = {
          year: fecha.getFullYear(),
          month: (fecha.getMonth() + 1),
          day: fecha.getDate()
      };
      console.log(options);
      this.myDatePickerOptions = options;

  }

    chartHovered(event: Event) {

    }

    chartClicked(event: Event ) {
    }
    onChanceDesde() {

    }
    onChanceHasta() {

    }

    onSelectClick(value) {
      if (!this.modelDesde && !this.modelHasta){
          this.showAlert = true;
          return;
      } else {
          const difDays = this.dateService.dateDif(this.modelDesde, this.modelHasta);
          this.setSelect(difDays)
      }
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

      this.apiService.post('ingreso/ingresoVehiculo/allByFechas', parametro).subscribe(
          (data) => {
              this.ingresos = data;
              this.generateChar();
          }
      );
    }

    private setSelect(difDays: number) {
        if (difDays < 32 && difDays > 7) {
            this.disableHoras = true;
            this.disableDias = false;
            this.modelIntervalo = 'Dias';
            this.disableSemanas = true;
            this.disableMes = true;
        } else if (difDays > 32 && difDays < 128) {
            this.disableHoras = true;
            this.disableDias = true;
            this.disableSemanas = false;
            this.modelIntervalo = 'Semanas';
            this.disableMes = false;
        } else if (difDays > 128) {
            this.disableMes = false;
            this.modelIntervalo = 'Mes';
            this.disableHoras = true;
            this.disableDias = true;
            this.disableSemanas = true;
        } else {
            this.disableHoras = false;
            this.modelIntervalo = 'Horas';
            this.disableDias = true;
            this.disableSemanas = true;
            this.disableMes = true;
        }
    }

    private generateChar() {

    }
}
