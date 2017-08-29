import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageHeaderModule } from './../../shared';
import {IngresoVehiculosRoutingModule} from './ingreso-vehiculos-routing.module';
import {IngresoVehiculosComponent} from './ingreso-vehiculos.component';
import {FormsModule} from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        PageHeaderModule,
        IngresoVehiculosRoutingModule,
        FormsModule
    ],
    declarations: [IngresoVehiculosComponent]
})
export class IngresoVehiculosModule { }
