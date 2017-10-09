import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {Reporte1Component} from './reporte-1.component';


const routes: Routes = [
    { path: '', component: Reporte1Component }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class Reporte1RoutingModule { }
