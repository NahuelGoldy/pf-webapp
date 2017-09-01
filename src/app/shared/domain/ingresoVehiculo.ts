import {ParqueEstacionamiento} from './parqueEstacionamiento';
import {Vehiculo} from './vehiculo';
export class IngresoVehiculo {
    fechaIngreso: string;
    fechaEgreso: string;
    idIngresoVehiculo: number;
    marcoSalidaDelParque: boolean;
    parqueEstacionamiento: ParqueEstacionamiento;
    vehiculoEstacionado: Vehiculo;
}
