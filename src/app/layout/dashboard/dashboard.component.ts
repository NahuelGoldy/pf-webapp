import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import {ApiService} from '../../shared/services/api.service';
import {IngresoVehiculo} from '../../shared/domain/ingresoVehiculo';
import {Egreso} from '../../shared/domain/egreso';
import {isNullOrUndefined} from 'util';
import {ParqueEstacionamiento} from '../../shared/domain/parqueEstacionamiento';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: [routerTransition()]
})
export class DashboardComponent implements OnInit {
    public sliders: Array<any> = [];
    public nombre: string;
    parque: ParqueEstacionamiento;
    ultimosIngresos: IngresoVehiculo[] = [];
    ultimosEgresosTemp: IngresoVehiculo[] = [];
    ultimosEgresos: Egreso[] = [];
    ocultarTablaUltIngresos = true;
    ocultarTablaUltEgresos = true;
    ingresadosActivos = 0;

    constructor(private apiService: ApiService) {
        this.sliders.push({
            imagePath: 'assets/images/parking-banner1.jpg',
            label: 'Revoluciona tu negocio'
        }, {
            imagePath: 'assets/images/parking-banner2.jpg',
            label: 'Potencia tus clientes'
        }, {
            imagePath: 'assets/images/parking-banner3.jpg',
            label: 'Incrementa tus ganancias!'
        });

        const id = JSON.parse(localStorage.getItem('currentParking')).idEstacionamiento;
        this.apiService.get('ingreso/' + id).subscribe( json => {
            json.reverse();
            json.forEach(i => {
                if (i.marcoSalidaDelParque) {
                    this.ultimosEgresosTemp.push(i);
                } else {
                    this.ultimosIngresos.push(i);
                    this.ingresadosActivos++;
                }
            });
            // (TODO REVISAR): sólo muestro los ultimos 5 ingresos/egresos
            if (this.ultimosIngresos.length > 5) {
                this.ultimosIngresos.splice(5, this.ultimosIngresos.length - 5);
            }
            this.ocultarTablaUltIngresos = false;

            this.procesarEgresos();
            if (this.ultimosEgresos.length > 5) {
                this.ultimosEgresos.splice(5, this.ultimosEgresos.length - 5);
            }
            this.ocultarTablaUltEgresos = false;
        });

        this.parque = JSON.parse(localStorage.getItem('currentParking'));
    }

    ngOnInit() {}

    private procesarEgresos() {
        this.ultimosEgresosTemp.forEach(e => {
            const egr = new Egreso();
            egr.nroPatente = e.vehiculoEstacionado.patente;
            if (isNullOrUndefined(e.vehiculoEstacionado.ownerVehiculo)) {
                egr.apellidoCliente = '';
                egr.nombreCliente = '';
            } else {
                egr.apellidoCliente = e.vehiculoEstacionado.ownerVehiculo.apellido;
                egr.nombreCliente = e.vehiculoEstacionado.ownerVehiculo.nombre;
            }
            egr.horaIngresoVehiculo = e.fechaIngreso;
            egr.horaEgresoVehiculo = e.fechaEgreso;
            const cantHoras = this.calcularCantHoras(e);
            egr.tiempoPermanencia = cantHoras + 'hs';
            egr.costoPermanencia = this.calcularCosto(cantHoras);

            this.ultimosEgresos.push(egr);
        });
    }

    private calcularCantHoras(egreso: IngresoVehiculo): number {
        const re = '-/g';
        const fechaIngreso = egreso.fechaIngreso.replace(re, '/');
        const fechaEgreso = egreso.fechaEgreso.replace(re, '/');
        return (Math.ceil((new Date(fechaEgreso).getTime() - new Date(fechaIngreso).getTime()) / (60 * 60 * 1000)));
    }

    private calcularCosto(cantHoras): number {
        return (cantHoras * this.parque.precioPorHora);
    }
}
