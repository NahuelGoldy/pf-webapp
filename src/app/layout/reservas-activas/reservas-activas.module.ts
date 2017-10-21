import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageHeaderModule } from './../../shared';
import {ReservasActivasRoutingModule} from './reservas-activas-routing.module';
import {ReservasActivasComponent} from './reservas-activas.component';

@NgModule({
    imports: [
        CommonModule,
        PageHeaderModule,
        ReservasActivasRoutingModule,
    ],
    declarations: [ReservasActivasComponent]
})
export class ReservasActivasModule {

}
