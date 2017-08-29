import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageHeaderModule } from './../../shared';
import {HistorialIngresosEgresosComponent} from './historial-ingresos-egresos.component';
import {HistorialIngresosEgresosRoutingModule} from './historial-ingresos-egresos-routing.module';

@NgModule({
    imports: [
        CommonModule,
        PageHeaderModule,
        HistorialIngresosEgresosRoutingModule
    ],
    declarations: [HistorialIngresosEgresosComponent]
})
export class HistorialIngresosEgresosModule { }
