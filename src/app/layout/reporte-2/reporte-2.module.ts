import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule as Ng2Charts } from 'ng2-charts';

import { PageHeaderModule } from '../../shared';
import {Reporte2RoutingModule} from './reporte-2-routing.module';
import {Reporte2Component} from './reporte-2.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MyDatePickerModule} from 'mydatepicker';

@NgModule({
    imports: [
        CommonModule,
        Ng2Charts,
        Reporte2RoutingModule,
        PageHeaderModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule.forRoot(),
        MyDatePickerModule
    ],
    declarations: [Reporte2Component]
})
export class Reporte2Module { }
