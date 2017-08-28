import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import {FormsModule} from '@angular/forms';
import {ApiService} from '../shared/services/api.service';
import {AuthenticationService} from '../shared/services/authentication.service';
import {AlertService} from '../shared/services/alert.service';

@NgModule({
    imports: [
        CommonModule,
        LoginRoutingModule,
        FormsModule
    ],
    declarations: [LoginComponent],
    providers: [
        AlertService,
        AuthenticationService,
        ApiService,
    ]
})
export class LoginModule {
}
