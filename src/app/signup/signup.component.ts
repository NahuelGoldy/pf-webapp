import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import {User} from '../shared/domain/usuario';
import {Router} from '@angular/router';
import {AlertService} from '../shared/services/alert.service';
import {AuthenticationService} from '../shared/services/authentication.service';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
    animations: [routerTransition()]
})
export class SignupComponent implements OnInit {

    usuario: User = new User();

    constructor(public router: Router,
                private alertService: AlertService,
                private authenticationService: AuthenticationService) {
    }

    ngOnInit() { }

    onSubmitClicked() { }
}
