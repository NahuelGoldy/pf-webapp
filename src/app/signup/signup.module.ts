import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignupRoutingModule } from './signup-routing.module';
import { SignupComponent } from './signup.component';
import {FormsModule} from '@angular/forms';
import {AlertService} from '../shared/services/alert.service';
import {AuthenticationService} from '../shared/services/authentication.service';
import {ApiService} from '../shared/services/api.service';

@NgModule({
    imports: [
        CommonModule,
        SignupRoutingModule,
        FormsModule
    ],
    declarations: [SignupComponent],
    providers: [
        AlertService,
        AuthenticationService,
        ApiService,
    ]
})
export class SignupModule { }
