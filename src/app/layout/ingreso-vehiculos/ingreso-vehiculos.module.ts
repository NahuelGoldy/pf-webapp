import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageHeaderModule } from './../../shared';
import {IngresoVehiculosRoutingModule} from './ingreso-vehiculos-routing.module';
import {IngresoVehiculosComponent} from './ingreso-vehiculos.component';

@NgModule({
    imports: [
        CommonModule,
        PageHeaderModule,
        IngresoVehiculosRoutingModule
    ],
    declarations: [IngresoVehiculosComponent]
})
export class IngresoVehiculosModule { }
