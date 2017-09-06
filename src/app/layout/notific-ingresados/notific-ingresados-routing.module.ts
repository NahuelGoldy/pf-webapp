import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {NotificIngresadosComponent} from './notific-ingresados.component';

const routes: Routes = [
    { path: '', component: NotificIngresadosComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class NotificIngresadosRoutingModule { }
