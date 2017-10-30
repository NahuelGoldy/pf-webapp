import { Component, OnInit } from '@angular/core';
import {routerTransition} from '../../router.animations';
import {IMyDpOptions} from 'mydatepicker';
import {Reserva} from '../../shared/domain/reserva';
import {ApiService} from '../../shared/services/api.service';
import {DateService} from '../../shared/services/date.service';
import {ParqueEstacionamiento} from '../../shared/domain/parqueEstacionamiento';

@Component({
  selector: 'app-reporte-3',
  templateUrl: './reporte-3.component.html',
  styleUrls: ['./reporte-3.component.scss'],
  animations: [routerTransition()]
})
export class Reporte3Component implements OnInit {

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
    reservas: Reserva[] = [];
    myDatePickerOptionsDesde: IMyDpOptions;
    myDatePickerOptionsHasta: IMyDpOptions;
    public today = new Date();
    public showAlert = false;
    totalReservas = 0;
    porcentajeAceptadas = '-';
    porcentajeExpiradas = '-';
    porcentajeCanceladas = '-';

    public pieChartLabels: string[] = ['Reservas expiradas', 'Reservas Confirmadas', 'Reservas Canceladas'];
    public pieChartData =  [0, 0, 0];
    public pieChartType = 'pie';

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
            this.modelDesde.date.year + '-' +
            ('0' + this.modelDesde.date.month).slice(-2) + '-' +
            ('0' + this.modelDesde.date.day).slice(-2);
            // ' 00:00:00';
        const fechaHasta =
            this.modelHasta.date.year + '-' +
            ('0' + this.modelHasta.date.month).slice(-2) + '-' +
            ('0' + this.modelHasta.date.day).slice(-2);
            // ' 00:00:00';

        const parque =  JSON.parse(localStorage.getItem('currentParking'));

        this.showLoading = true;
        this.apiService.get('/reserva/all/parque/' + parque.idEstacionamiento).subscribe(
            (data) => {
                this.reservas = data;
                this.generateChar(fechaDesde, fechaHasta);
                // this.generateAverages();
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

    private generateChar(fechaDesde: string, fechaHasta: string) {
        let confirmadas = 0, canceladas = 0, expiradas = 0;
        this.reservas.forEach(r => {
            if (r.horaCreacionReserva.slice(0, 10).localeCompare(fechaDesde) >= 0
                && r.horaCreacionReserva.slice(0, 10).localeCompare(fechaHasta) <= 0) {
                if (r.cancelada) {
                    canceladas++;
                }
                if (r.confirmada) {
                    confirmadas++;
                }
                if (r.expirada) {
                    expiradas++;
                }
            }
        });
        const data = [];
        data.push(expiradas);
        data.push(confirmadas);
        data.push(canceladas);
        this.pieChartData = data;
        this.totalReservas = 0;
        this.pieChartData.forEach(d => this.totalReservas += d);
        this.porcentajeCanceladas = Math.round((this.pieChartData[2] / this.totalReservas) * 100).toString();
        this.porcentajeAceptadas = Math.round((this.pieChartData[1] / this.totalReservas) * 100).toString();
        this.porcentajeExpiradas = Math.round((this.pieChartData[0] / this.totalReservas) * 100).toString();
        this.showLoading = false;
    }
}
