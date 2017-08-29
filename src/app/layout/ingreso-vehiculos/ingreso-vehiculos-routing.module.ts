import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IngresoVehiculosComponent } from './ingreso-vehiculos.component';

const routes: Routes = [
    { path: '', component: IngresoVehiculosComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class IngresoVehiculosRoutingModule { }
