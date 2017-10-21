import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HistorialReservasComponent} from './historial-reservas.component';


const routes: Routes = [
    { path: '', component: HistorialReservasComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HistorialReservasRoutingModule { }
