import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../shared/services/api.service';
import {IngresoVehiculo} from '../../shared/domain/ingresoVehiculo';
import {ParametroReporte} from '../../shared/domain/parametroReporte';
import {ParqueEstacionamiento} from '../../shared/domain/parqueEstacionamiento';
import {IMyDate, IMyDpOptions} from 'mydatepicker';
import {DateserviceService} from '../../shared/services/dateservice.service';

@Component({
  selector: 'app-reporte-1',
  templateUrl: './reporte-1.component.html',
  styleUrls: ['./reporte-1.component.scss']
})
export class Reporte1Component implements OnInit{
    modelDesde: any;
    modelHasta: any;
    modelIntervalo = '';
    disableAnos = true;
    disableMes = true;
    disableHoras = true;
    disableDias = true;
    disableSemanas = true;
    difDays: number;

    ingresos: IngresoVehiculo[];
    myDatePickerOptionsDesde: IMyDpOptions;
    myDatePickerOptionsHasta: IMyDpOptions;

    // lineChart
    public linearChartDataAux: Array<any> = [0, 0, 0];
    public lineChartData: Array<any> = [
        // TODO (harcodeado para estetica), refactorizar
        { data: this.linearChartDataAux , label: 'Ingresos' }
    ];
    public chartLabels: Array<any> = [];
    public lineChartLabels: Array<any> = ['*', '*'];
    public lineChartOptions: any = {  responsive: true    };
    public lineChartColors: Array<any> = [
        {
            backgroundColor: 'rgba(77,83,96,0.2)',
            borderColor: 'rgba(77,83,96,1)',
            pointBackgroundColor: 'rgba(77,83,96,1)',
            pointBorderColor: '#4f79af',
            pointHoverBackgroundColor: '#44a354',
            pointHoverBorderColor: 'rgba(77,83,96,1)'
        }
    ];
    public lineChartLegend = true;
    public lineChartType = 'line';
    public today = new Date();
    public showAlert = false;

  constructor(private apiService: ApiService, private dateService: DateserviceService) { }

  ngOnInit() {
      this.myDatePickerOptionsDesde = {
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

      const options = JSON.parse(JSON.stringify(this.myDatePickerOptionsDesde));
      const fecha = new Date(this.today.getTime() + 86400000);
      console.log(fecha);
      options.disableSince = {
          year: fecha.getFullYear(),
          month: (fecha.getMonth() + 1),
          day: fecha.getDate()
      };
      console.log(options);
      this.myDatePickerOptionsDesde = options;
      this.myDatePickerOptionsHasta = options;
  }

    chartHovered(event: Event) {
    }

    chartClicked(event: Event ) {
    }

    onChangeDesde(data) {
        const options = JSON.parse(JSON.stringify(this.myDatePickerOptionsHasta));
        this.modelDesde = data;
        const fecha = new Date(this.modelDesde.epoc * 1000 - 86400000);
        options.disableUntil = {
            year: fecha.getFullYear(),
            month: (fecha.getMonth() + 1) ,
            day: fecha.getDate()
        };
        this.myDatePickerOptionsHasta = options;
    }
    onChangeHasta(data) {
        this.modelHasta = data;
        this.difDays = this.dateService.dateDif(this.modelDesde, this.modelHasta);
        this.setSelect(this.difDays);
    }

    onSelectClick(value) {
      if (!this.modelDesde && !this.modelHasta) {
          this.showAlert = true;
      } else {
          this.showAlert = false;
      }
    }

    onGenerateClick() {
      const fechaDesde =
          ('0' + this.modelDesde.date.day).slice(-2) + '/' +
          ('0' + this.modelDesde.date.month).slice(-2) + '/' +
          this.modelDesde.date.year;
      const fechaHasta =
            ('0' + this.modelHasta.date.day).slice(-2) + '/' +
            ('0' + this.modelHasta.date.month).slice(-2) + '/' +
            this.modelHasta.date.year;
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
        if (this.modelIntervalo === 'Horas') {
            this.graficoHoras();
        } else if (this.modelIntervalo === 'Dias') {
            this.graficoDias()
        } else if (this.modelIntervalo === 'Semanas') {
            this.graficoSem()
        } else if (this.modelIntervalo === 'Mes') {
            this.graficoMeses()
        }
    }

    arrayGenerator (length: number, type: string, array: Array<any>) {
      for (let i = 0; i < length; i++) {
          if (type === 'string') {
              if (!array[i]) {
                  array.push(i);
              } else {
                  array[i] = '-';
              }
          }
          if (type === 'number' ) {
              if (!array[i]) {
                  array.push(i);
              } else {
                  array[i] = 0;
              };
          }
      }
      if (array.length > length) {array.splice(length , array.length - length + 1)}
      return array;
    }

    graficoSem() {
        const linearCharData: Array<any> = this.arrayGenerator(this.difDays / 7 ,
            'number' , this.linearChartDataAux );
        const linearCharLabels: Array<any> = this.arrayGenerator(this.difDays / 7 ,
            'string', this.lineChartLabels );

        for (let ingreso of this.ingresos) {
            // Tomo el dia de ingreso yyyy-mm-dd
            console.log(new Date(ingreso.fechaIngreso).getDay());
            let dia: number = +ingreso.fechaIngreso.substr(0, 10 ).slice(-2);

            // Bugea si se llega a dar que quedan dos dias con el mismo numero en el rango
            linearCharData[dia]++;
        }

        this.lineChartData = [ { data: this.linearChartDataAux, label: 'Ingresos' } ];
        this.lineChartLabels = linearCharLabels;
    }
    graficoMeses() {

    }

    graficoDias() {
        const linearCharData: Array<any> = this.arrayGenerator(this.difDays ,
            'number' , this.linearChartDataAux );
        const linearCharLabels: Array<any> = this.arrayGenerator(this.difDays ,
            'string', this.lineChartLabels );

        for (let ingreso of this.ingresos) {
            // Tomo el dia de ingreso yyyy-mm-dd
            let dia: number = +ingreso.fechaIngreso.substr(0, 10 ).slice(-2);
            dia = dia - (+this.modelDesde.date.day);
            // Bugea si se llega a dar que quedan dos dias con el mismo numero en el rango
            this.linearChartDataAux[dia]++;
        }

        this.lineChartData = [ { data: this.linearChartDataAux, label: 'Ingresos' } ];
        this.lineChartLabels = linearCharLabels;

    }

    graficoHoras() {
        let rangeHs = 1;
        let hs = 0;
        if (this.difDays < 4 && this.difDays > 1) { rangeHs = 2}
            else { if (this.difDays < 6 && this.difDays > 3) { rangeHs = 4}
                else {if (this.difDays < 8 && this.difDays > 5) { rangeHs = 8}}
        }

        const linearCharData: Array<any> = this.arrayGenerator( ((this.difDays * 24 ) / rangeHs) , 'number' , this.linearChartDataAux );
        const linearCharLabels: Array<any> = this.arrayGenerator( ((this.difDays * 24 ) / rangeHs) , 'string', this.lineChartLabels );

        for (let ingreso of this.ingresos) {
            // Tomo la hora de ingreso
            const hora = +ingreso.fechaIngreso.slice(-8).substr(0, 2 );
            // Si es el primero seteo la primer hora de filtro
            if ( !hs ) {
                hs = hora / rangeHs;
                linearCharData[hs] = 1;
            } else {
                if ( (hs + rangeHs) >= hora ) {hs = hs + rangeHs; }
                if (!linearCharData[hs]) {
                    linearCharData[hs] = 1;
                } else {
                    linearCharData[hs]++;
                }
            }
        }
        this.lineChartData = [
            { data: linearCharData, label: 'Ingresos' }
        ];
        this.lineChartLabels = linearCharLabels;
    }
}
