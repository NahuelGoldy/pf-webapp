import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageHeaderModule } from './../../shared';
import {FormsModule} from '@angular/forms';
import {AdminPanelRoutingModule} from './admin-panel-routing.module';
import {AdminPanelComponent} from './admin-panel.component';

@NgModule({
    imports: [
        CommonModule,
        PageHeaderModule,
        AdminPanelRoutingModule,
        FormsModule
    ],
    declarations: [AdminPanelComponent]
})
export class AdminPanelModule { }
