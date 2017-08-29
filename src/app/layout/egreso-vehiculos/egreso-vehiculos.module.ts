import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageHeaderModule } from './../../shared';
import {EgresoVehiculosComponent} from './egreso-vehiculos.component';
import {EgresoVehiculosRoutingModule} from './egreso-vehiculos-routing.module';

@NgModule({
    imports: [
        CommonModule,
        PageHeaderModule,
        EgresoVehiculosRoutingModule
    ],
    declarations: [EgresoVehiculosComponent]
})
export class EgresoVehiculosModule { }
