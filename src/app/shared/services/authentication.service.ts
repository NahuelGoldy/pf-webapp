import {EventEmitter, Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {isNullOrUndefined} from 'util';
import {User} from '../domain/usuario';
import {ApiService} from './api.service';

@Injectable()
export class AuthenticationService {
    public currentUser$: EventEmitter<User>;
    private currentUser: User;

    constructor(private api: ApiService) {
        this.currentUser$ = new EventEmitter();
    }

    login(user: User) {
        return this.api.loginPost('login', user)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                if (user && response.json()['token']) {
                    // user = response.json()['user'];
                    user.token = response.json()['token'];
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.api.useJwt();
                    this.currentUser$.emit(user);
                    this.currentUser = user;
                }
            }).first().toPromise();
    }

    logout() {
        // call the api to invalidate the token
        this.api.logout();

        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUser$.emit(null);
        this.currentUser = null;
    }

    getCurrentUser() {
        if (isNullOrUndefined(this.currentUser)) {
            this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        }
        return this.currentUser;
    }
}
