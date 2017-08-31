import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageHeaderModule } from './../../shared';
import {EgresoVehiculosComponent} from './egreso-vehiculos.component';
import {EgresoVehiculosRoutingModule} from './egreso-vehiculos-routing.module';
import {FormsModule} from '@angular/forms';
import {NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports: [
        CommonModule,
        PageHeaderModule,
        FormsModule,
        EgresoVehiculosRoutingModule,
        NgbAlertModule.forRoot()
    ],
    declarations: [EgresoVehiculosComponent]
})
export class EgresoVehiculosModule { }
