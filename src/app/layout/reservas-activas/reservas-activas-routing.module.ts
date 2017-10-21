import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ReservasActivasComponent} from './reservas-activas.component';


const routes: Routes = [
    { path: '', component: ReservasActivasComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ReservasActivasRoutingModule { }
