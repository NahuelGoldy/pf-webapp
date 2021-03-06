import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    NgbCarouselModule,
    NgbAlertModule
} from '@ng-bootstrap/ng-bootstrap';


import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import {
    NotificationComponent,
    ChartComponent
} from './components';
import { StatModule } from '../../shared';
import { ChartsModule as Ng2Charts } from 'ng2-charts';

@NgModule({
    imports: [
        CommonModule,
        NgbCarouselModule.forRoot(),
        NgbAlertModule.forRoot(),
        DashboardRoutingModule,
        StatModule,
        Ng2Charts,
    ],
    declarations: [
        DashboardComponent,
        NotificationComponent,
        ChartComponent
    ]
})
export class DashboardModule { }
