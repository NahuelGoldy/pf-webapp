import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import {User} from '../shared/domain/usuario';
import {AuthenticationService} from '../shared/services/authentication.service';
import {AlertService} from '../shared/services/alert.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {

    usuario: User = new User();
    loading = false;
    submitted = false;

    constructor(public router: Router,
                private alertService: AlertService,
                private authenticationService: AuthenticationService) {
    }

    ngOnInit() {
    }

    onLoggedin() {
        this.loading = true;
        this.submitted = true;
        // TODO mostrar un "Autenticando.." mas copado
        this.authenticationService.login(this.usuario)
            .then(() => {
                this.loading = false;
                this.router.navigate(['/dashboard']);
            })
            .catch(error => {
                this.alertService.error(error.json()['error']);
            });
        localStorage.setItem('isLoggedin', 'true');
    }

    onInputChange() {
        this.submitted = false;
    }

}
