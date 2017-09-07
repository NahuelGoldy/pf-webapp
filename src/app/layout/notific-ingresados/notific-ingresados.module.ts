import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageHeaderModule } from './../../shared';
import {NotificIngresadosRoutingModule} from './notific-ingresados-routing.module';
import {NotificIngresadosComponent} from './notific-ingresados.component';
import {DataTablesModule} from 'angular-datatables';
import {NotifDialogComponent} from './notif-dialog/notif-dialog.component';

@NgModule({
    imports: [
        CommonModule,
        PageHeaderModule,
        NotificIngresadosRoutingModule,
        DataTablesModule,
    ],
    declarations: [
        NotificIngresadosComponent,
        NotifDialogComponent
    ]
})
export class NotificIngresadosModule { }
