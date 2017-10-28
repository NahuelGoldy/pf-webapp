import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {Reporte3Component} from './reporte-3.component';


const routes: Routes = [
    { path: '', component: Reporte3Component }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class Reporte3RoutingModule { }
