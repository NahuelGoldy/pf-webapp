import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {EgresoVehiculosComponent} from './egreso-vehiculos.component';

const routes: Routes = [
    { path: '', component: EgresoVehiculosComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EgresoVehiculosRoutingModule { }
