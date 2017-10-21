import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageHeaderModule } from './../../shared';
import {DataTablesModule} from 'angular-datatables';
import {HistorialReservasRoutingModule} from './historial-reservas-routing.module';
import {HistorialReservasComponent} from './historial-reservas.component';

@NgModule({
    imports: [
        CommonModule,
        PageHeaderModule,
        HistorialReservasRoutingModule,
        DataTablesModule,
    ],
    declarations: [HistorialReservasComponent]
})
export class HistorialReservasModule {

}
