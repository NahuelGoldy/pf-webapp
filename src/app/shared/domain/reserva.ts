import {User} from './usuario';
import {ParqueEstacionamiento} from './parqueEstacionamiento';
export class Reserva {
    idReserva: number;
    cancelada: boolean;
    confirmada: boolean;
    horaCreacionReserva: string;
    horaConfirmacion: string;
    horaExpiracion: string;
    usuario: User;
    parque: ParqueEstacionamiento;
    expirada: boolean;
}

