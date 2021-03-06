import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../shared/services/api.service';
import {IngresoVehiculo} from '../../shared/domain/ingresoVehiculo';
import {ParametroReporte} from '../../shared/domain/parametroReporte';
import {ParqueEstacionamiento} from '../../shared/domain/parqueEstacionamiento';
import {IMyDate, IMyDpOptions} from 'mydatepicker';
import {DateService} from '../../shared/services/date.service';
import {routerTransition} from '../../router.animations';

@Component({
  selector: 'app-reporte-1',
  templateUrl: './reporte-1.component.html',
  styleUrls: ['./reporte-1.component.scss'],
  animations: [routerTransition()]
})
export class Reporte1Component implements OnInit {

    showLoading = false;
    modelDesde: any;
    modelHasta: any;
    modelIntervalo = '';
    disableAnos = true;
    disableMes = true;
    disableHoras = true;
    disableDias = true;
    disableSemanas = true;
    difDays: number;
    promedioHora = '-';
    promedioDia = '-';
    promedioSemana = '-';
    promedioMes = '-';

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
            backgroundColor: 'rgba(12, 147, 0, 0.4)',
            borderColor: 'rgba(77,83,96, 0.7)',
            pointBackgroundColor: 'rgba(77,83,96,1)',
            pointBorderColor: '#000',
            pointHoverBackgroundColor: '#44a354',
            pointHoverBorderColor: 'rgba(77,83,96,1)'
        }
    ];
    public lineChartLegend = true;
    public lineChartType = 'line';
    public today = new Date();
    public showAlert = false;

  constructor(private apiService: ApiService, private dateService: DateService) { }

  ngOnInit() {
      this.myDatePickerOptionsDesde = {
          // other options...
          dateFormat: 'dd/mm/yyyy',
          dayLabels: {su: 'Dom', mo: 'Lun', tu: 'Mar', we: 'Mié', th: 'Jue', fr: 'Vie', sa: 'Sáb'},
          monthLabels: {1: 'Ene', 2: 'Feb', 3: 'Mar', 4: 'Abr', 5: 'May', 6: 'Jun',
              7: 'Jul', 8: 'Ago', 9: 'Sep', 10: 'Oct', 11: 'Nov', 12: 'Dic'},
          todayBtnTxt: 'Hoy',
          showClearDateBtn: true,
          editableDateField: false,
          openSelectorOnInputClick: true,
          alignSelectorRight: false,
      };

      const options = JSON.parse(JSON.stringify(this.myDatePickerOptionsDesde));
      const fecha = new Date(this.today.getTime() + 86400000);
      options.disableSince = {
          year: fecha.getFullYear(),
          month: (fecha.getMonth() + 1),
          day: fecha.getDate()
      };
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
    if (this.modelHasta) {
        this.difDays = this.dateService.dateDif(this.modelDesde, this.modelHasta);
        this.setSelect(this.difDays);
    }
    }

    onChangeHasta(data) {
        this.modelHasta = data;
        this.difDays = this.dateService.dateDif(this.modelDesde, this.modelHasta);
        this.setSelect(this.difDays);
    }

    onSelectClick(value) {
    this.difDays = this.dateService.dateDif(this.modelDesde, this.modelHasta);
    this.setSelect(this.difDays);
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
            this.modelDesde.date.year +
            ' 00:00:00';
      const fechaHasta =
            ('0' + this.modelHasta.date.day).slice(-2) + '/' +
            ('0' + this.modelHasta.date.month).slice(-2) + '/' +
            this.modelHasta.date.year +
            ' 00:00:00';
      const parametro = new ParametroReporte();
      let parque = new ParqueEstacionamiento;
      parametro.fechaFinal = fechaHasta;
      parametro.fechaInicial = fechaDesde;
      parque =  JSON.parse(localStorage.getItem('currentParking'));
      parametro.idEstacionamiento = parque.idEstacionamiento;

      this.showLoading = true;
      this.apiService.post('ingreso/ingresoVehiculo/allByFechas', parametro).subscribe(
          (data) => {
              this.ingresos = data;
              this.generateChar();
              this.generateAverages();
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
        this.showLoading = false;
    }

    private generateAverages() {
      const diffHoras = this.dateService.diffHours(this.modelDesde, this.modelHasta);
      const diffDias = this.dateService.diffDays(this.modelDesde, this.modelHasta);
      const diffSemanas = this.dateService.diffWeeks(this.modelDesde, this.modelHasta);
      const diffMeses = this.dateService.diffMonths(this.modelDesde, this.modelHasta);

      this.promedioHora = (this.ingresos.length / diffHoras).toFixed(2);
      diffDias < 2 ? this.promedioDia = '-' : this.promedioDia = (this.ingresos.length / diffDias).toFixed(2);
      diffSemanas < 1 ? this.promedioSemana = '-' : this.promedioSemana = Math.round(this.ingresos.length / diffSemanas).toString();
      diffMeses < 1 ? this.promedioMes = '-' : this.promedioMes = Math.round(this.ingresos.length / diffMeses).toString();
    }

    arrayGenerator (length: number, type: string, array: Array<any>) {
      for (let i = 0; i < length; i++) {
          if (type === 'string') {
              if (!array[i]) {
                  array.push('+');
              } else {
                  array[i] = '-';
              }
          }
          if (type === 'number' ) {
              if (!array[i]) {
                  array.push(0);
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

        for (const ingreso of this.ingresos) {
            // Tomo el dia de ingreso yyyy-mm-dd
            const dia: number = +ingreso.fechaIngreso.substr(0, 10 ).slice(-2);

            // Bugea si se llega a dar que quedan dos dias con el mismo numero en el rango
            linearCharData[dia]++;
        }

        this.lineChartData = [ { data: this.linearChartDataAux, label: 'Ingresos' } ];
        this.chartLabelsGenerator('Sem', 1, linearCharLabels);
        this.lineChartLabels = linearCharLabels;
    }
    graficoMeses() {

    }

    graficoDias() {
        const linearCharData: Array<any> = this.arrayGenerator(this.difDays ,
            'number' , this.linearChartDataAux );
        const linearCharLabels: Array<any> = this.arrayGenerator(this.difDays ,
            'string', this.lineChartLabels );

        for (const ingreso of this.ingresos) {
            // Tomo el dia de ingreso yyyy-mm-dd
            let dia: number = +ingreso.fechaIngreso.substr(0, 10 ).slice(-2);
            dia = dia - (+this.modelDesde.date.day);
            // Bugea si se llega a dar que quedan dos dias con el mismo numero en el rango
            this.linearChartDataAux[dia]++;
        }

        this.lineChartData = [ { data: this.linearChartDataAux, label: 'Ingresos' } ];
        this.chartLabelsGenerator('Dias', 1, linearCharLabels);
        this.lineChartLabels = linearCharLabels;

    }

    graficoHoras() {
        let rangeHs = 1;
        const hs = 0;
        if (this.difDays < 4 && this.difDays > 1) {
            rangeHs = 2
        } else {
            if (this.difDays < 6 && this.difDays > 3) {
                rangeHs = 4
            } else {
                if (this.difDays < 8 && this.difDays > 5) { rangeHs = 8}}
        }

        /*const linearCharData: Array<any> = this.arrayGenerator( ((this.difDays * 24 ) / rangeHs) ,
            'number' , this.linearChartDataAux );*/
        // const linearCharLabels: Array<any> = this.arrayGenerator( ((this.difDays * 24 ) / rangeHs) ,
        //     'string', this.lineChartLabels );
        // this.chartLabelsGenerator('Horas', rangeHs, linearCharLabels);

        const data: Map<string, number> = new Map();

            this.ingresos.forEach( i => {
                const keyFecha = i.fechaIngreso.slice(0, 11);
                const key = (+i.fechaIngreso.slice(11, 13)) - (+i.fechaIngreso.slice(11, 13) % rangeHs);
                const key_str = ('0' + key).slice(-2) + ':00';
                if ((data.get(keyFecha + key_str)) == null) {
                    data.set(keyFecha + key_str, 0);
                } else {
                    data.set(keyFecha + key_str, data.get(keyFecha + key_str) + 1);
                }
            });

            const chartData = [];
            this.lineChartLabels.splice(0);
            data.forEach((value: number, key: string) => {
                this.lineChartLabels.push(key);
                // chartData.push(value);
            });

            this.lineChartLabels.sort();

            this.lineChartLabels.forEach(x => {
                chartData.push(data.get(x));
            });

            for (let i = 0; i < this.lineChartLabels.length; i++) {
                const hora = +(this.lineChartLabels[i].slice(11, 13));
                if (hora === 0) {
                    const mes = this.lineChartLabels[i].slice(5, 7);
                    const dia = this.lineChartLabels[i].slice(8, 10);
                    const hsDia = this.lineChartLabels[i].slice(11, 13);
                    this.lineChartLabels[i] = dia + '/' + mes + ' ' + hsDia + ':00';
                } else {
                    this.lineChartLabels[i] = this.lineChartLabels[i].slice(11, 13) + ':00';
                }
            }

            this.lineChartData = [
                { data: chartData, label: 'Ingresos' }
            ];

       /* this.lineChartData = [    { data: linearCharData, label: 'Ingresos' }        ];*/
       // this.lineChartLabels = linearCharLabels;
    }

    public chartLabelsGenerator(type: String, intervalo: number, array: Array<any>) {
        switch (type) {
            case 'Horas': {
                let horas = 0;
                for (let i = 0; i < array.length; i++) {
                    array[i] = (
                        ('0' + horas).slice(-2) + ':00');
                    horas += intervalo;
                    if (horas >= 24) {
                        horas = 0;
                    }
                }
                break;
            }
            case 'Dias': {
                let day = this.modelDesde.date.day;
                let month = this.modelDesde.date.month;
                for (let i = 0; i < array.length; i++) {
                    array[i] = (day + '/' + month);
                    const nextDayMillis = this.modelDesde.epoc * 1000 + (86400000 * (i + 1));
                    day = new Date(nextDayMillis).getDate();
                    month = new Date(nextDayMillis).getMonth() + 1;
                }
                break;
            }
            case 'Sem': {
                let sem = 0;
                for (let i = 0; i < array.length; i++) {
                    array[i] = ('Sem. ' + sem);
                    sem += intervalo;
                }
                break;
            }
            case 'Mes': {
                let anio = this.modelDesde.date.year;
                let month = this.modelDesde.date.month;
                for (let i = 0; i < array.length; i++) {
                    array[i] = (month + '/' + anio);
                    const nextDayMillis = this.modelDesde.epoc * 1000 + (86400000 * (i + 1));
                    anio = new Date(nextDayMillis).getFullYear();
                    month = new Date(nextDayMillis).getMonth() + 1;
                }
                break;
            }
        }
        return array;
    }
}
