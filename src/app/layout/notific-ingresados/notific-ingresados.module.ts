import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageHeaderModule } from './../../shared';
import {NotificIngresadosRoutingModule} from './notific-ingresados-routing.module';
import {NotificIngresadosComponent} from './notific-ingresados.component';
import {DataTablesModule} from 'angular-datatables';

@NgModule({
    imports: [
        CommonModule,
        PageHeaderModule,
        NotificIngresadosRoutingModule,
        DataTablesModule,
    ],
    declarations: [NotificIngresadosComponent]
})
export class NotificIngresadosModule { }
