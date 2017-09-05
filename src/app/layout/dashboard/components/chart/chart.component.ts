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
        { data: [5, 5, 21, 87, 61, 40, 55, 23, 0], label: 'Ocupación (últimas 24 hs)' }
    ];
    public lineChartLabels: Array<any> = ['00:00', '03:00', '06:00', '9:00', '12:00', '15:00', '18:00', '21:00', '00:00'];
    public lineChartOptions: any = {
        responsive: true
    };
    public lineChartColors: Array<any> = [
        {
            backgroundColor: 'rgba(25,0,255,0.3)',
            borderColor: 'rgba(77,83,96,1)',
            pointBackgroundColor: 'rgba(77,83,96,1)',
            pointBorderColor: 'rgba(0,0,0,0.5)',
            pointHoverBackgroundColor: '#270fff',
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
    }
}
