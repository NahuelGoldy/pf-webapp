import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule as Ng2Charts } from 'ng2-charts';

import { PageHeaderModule } from '../../shared';
import {Reporte3RoutingModule} from './reporte-3-routing.module';
import {Reporte3Component} from './reporte-3.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MyDatePickerModule} from 'mydatepicker';

@NgModule({
    imports: [
        CommonModule,
        Ng2Charts,
        Reporte3RoutingModule,
        PageHeaderModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule.forRoot(),
        MyDatePickerModule
    ],
    declarations: [Reporte3Component]
})
export class Reporte3Module { }
