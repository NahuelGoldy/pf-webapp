import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageHeaderModule } from './../../shared';
import {HistorialIngresosEgresosComponent} from './historial-ingresos-egresos.component';
import {HistorialIngresosEgresosRoutingModule} from './historial-ingresos-egresos-routing.module';
import {DataTablesModule} from 'angular-datatables';

@NgModule({
    imports: [
        CommonModule,
        PageHeaderModule,
        HistorialIngresosEgresosRoutingModule,
        DataTablesModule,
    ],
    declarations: [HistorialIngresosEgresosComponent]
})
export class HistorialIngresosEgresosModule {

}
