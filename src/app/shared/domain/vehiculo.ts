import {User} from './usuario';
export class Vehiculo {
    id: number;
    colorVehiculo: string;
    modelo: string;
    anio: string;
    patente: string;
    ownerVehiculo: User;
}
