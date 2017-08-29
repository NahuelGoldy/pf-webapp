import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HistorialIngresosEgresosComponent} from './historial-ingresos-egresos.component';


const routes: Routes = [
    { path: '', component: HistorialIngresosEgresosComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HistorialIngresosEgresosRoutingModule { }
