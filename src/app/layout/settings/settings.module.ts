import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageHeaderModule } from './../../shared';
import {FormsModule} from '@angular/forms';
import {SettingsComponent} from './settings.component';
import {SettingsRoutingModule} from './settings-routing.module';

@NgModule({
    imports: [
        CommonModule,
        PageHeaderModule,
        SettingsRoutingModule,
        FormsModule
    ],
    declarations: [SettingsComponent]
})
export class SettingsModule { }
