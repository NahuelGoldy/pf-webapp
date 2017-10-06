import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule as Ng2Charts } from 'ng2-charts';

import { PageHeaderModule } from '../../shared';
import {Reporte1Component} from './reporte-1.component';
import {Reporte1RoutingModule} from './reporte-1-routing.module';

@NgModule({
    imports: [
        CommonModule,
        Ng2Charts,
        Reporte1RoutingModule,
        PageHeaderModule
    ],
    declarations: [Reporte1Component]
})
export class Reporte1Module { }
