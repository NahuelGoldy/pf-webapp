import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-chart',
    templateUrl: './chart.component.html',
    styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

    // Doughnut
    public doughnutChartLabels: string[] = ['Pago electrónico', 'Reserva', 'Usuario no registrado'];
    public doughnutChartData: number[] = [350, 450, 100];
    public doughnutChartType = 'doughnut';

    // lineChart
    public lineChartData: Array<any> = [
        // TODO (harcodeado para estetica), refactorizar
        { data: [87, 61, 40, 55, 23, 0, 5, 100, 64], label: '% ocupación' }
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

    // events
    public chartClicked(e: any): void {
        // console.log(e);
    }

    public chartHovered(e: any): void {
        // console.log(e);
    }

    constructor() {
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
        this.lineChartLabels.push(horaActual);
        posteriores.forEach( x => this.lineChartLabels.push(x));
        anteriores.forEach( x => this.lineChartLabels.push(x));
        this.lineChartLabels.push(horaActual);
    }
}
