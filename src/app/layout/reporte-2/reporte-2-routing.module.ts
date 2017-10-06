import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {Reporte2Component} from './reporte-2.component';


const routes: Routes = [
    { path: '', component: Reporte2Component }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class Reporte2RoutingModule { }
