import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../../../shared/services/api.service';
import {ParametroReporte} from '../../../../shared/domain/parametroReporte';
import {IngresoVehiculo} from '../../../../shared/domain/ingresoVehiculo';

@Component({
    selector: 'app-chart',
    templateUrl: './chart.component.html',
    styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

    ingresos: IngresoVehiculo[] = [];
    data: Map<string, number> = new Map();

    // Doughnut
    public doughnutChartLabels: string[] = ['Pago electrónico', 'Reserva', 'Usuario no registrado'];
    public doughnutChartData: number[] = [350, 450, 100];
    public doughnutChartType = 'doughnut';

    // lineChart
    public lineChartData: Array<any> = [
        { data: [] , label: 'Ingresos' }
    ];
    public chartLabels: Array<any> = ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00'];
    public lineChartLabels: Array<any> = [];
    public lineChartOptions: any = {
        scales: {
            yAxes: [{ticks: { beginAtZero: true } }]
        },
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

    // events
    public chartClicked(e: any): void {
        // console.log(e);
    }

    public chartHovered(e: any): void {
        // console.log(e);
    }

    constructor(private apiService: ApiService) {
        const today = new Date();
        const tomorrow = new Date(today.getTime() + 86400000);
        const yesterday = new Date(today.getTime() - 86400000);
        const parametro = new ParametroReporte();
        const parque =  JSON.parse(localStorage.getItem('currentParking'));
        const fechaHasta =
            ('0' + tomorrow.getDate()).slice(-2) + '/' +
            ('0' + (tomorrow.getMonth() + 1)).slice(-2) + '/' +
            tomorrow.getFullYear() + ' ' +
            tomorrow.getHours() + ':' +
            tomorrow.getMinutes() + ':' +
            tomorrow.getSeconds();
        const fechaDesde =
            ('0' + yesterday.getDate()).slice(-2) + '/' +
            ('0' + (yesterday.getMonth() + 1)).slice(-2) + '/' +
            yesterday.getFullYear() + ' ' +
            yesterday.getHours() + ':' +
            yesterday.getMinutes() + ':' +
            yesterday.getSeconds();

        parametro.fechaFinal = fechaHasta;
        parametro.fechaInicial = fechaDesde;
        /*parametro.fechaFinal = '15/10/2017 00:00:00';
        parametro.fechaInicial = '13/10/2017 00:00:00';*/
        parametro.idEstacionamiento = parque.idEstacionamiento;

        this.apiService.post('ingreso/ingresoVehiculo/allByFechas', parametro).subscribe(
            (data) => {
                this.ingresos = data;

                this.poblarMapIngresos();
            }
        );
    }

    ngOnInit() {
        // Busco y ordeno los labels (Horas del gráfico) según la hora actual, para mostrar las últimas 24hs
        const horaActual = (('0' + (new Date().getHours() - (new Date().getHours() % 3))).slice(-2) + ':00');
        const anteriores = [];
        const posteriores = [];
        this.chartLabels.forEach( lab => {
            switch (lab.localeCompare(horaActual)) {
                case -1: {
                    anteriores.push(lab);
                    break;
                }
                case 1: {
                    posteriores.push(lab);
                    break;
                }
            }
        });

        posteriores.forEach( x => {
            this.lineChartLabels.push(x);
            this.data.set(x, 0);
        });
        anteriores.forEach( x => {
            this.lineChartLabels.push(x);
            this.data.set(x, 0);
        });
        this.lineChartLabels.push(horaActual);
        this.data.set(horaActual, 0);
    }

    poblarMapIngresos() {
        this.ingresos.forEach( i => {
            const key = (+i.fechaIngreso.slice(11, 13)) - (+i.fechaIngreso.slice(11, 13) % 3);
            const key_str = ('0' + key).slice(-2) + ':00';
            this.data.set(key_str, this.data.get(key_str) + 1);
        });

        const chartData = [];
        this.data.forEach((value: number, key: string) => {
            chartData.push(value);
        });

        this.lineChartData = [
            { data: chartData, label: 'Ingresos' }
        ];
    }
}
