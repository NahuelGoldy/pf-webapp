import {Injectable} from '@angular/core';
import {Headers, Http, Response, ResponseContentType} from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';
import {Router} from '@angular/router';
import {isNullOrUndefined} from 'util';
import {Subscription} from 'rxjs/Subscription';
import {AlertService} from './alert.service';
import {User} from '../domain/usuario';

@Injectable()
export class ApiService {
    // server URL
    private baseURL = 'http://dondeestaciono.cloudapp.net:8080/';
    private user: User;
    private timer: Observable<number>;
    private timerSubscription: Subscription;

    //
    // HEADERS
    //

    private headers: Headers = new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
    });

    //
    // constructor
    //

    constructor(private http: Http,
                private router: Router,
                private alertService: AlertService) {
        // this.user = JSON.parse(localStorage.getItem('currentUser'));
        // if (!isNullOrUndefined(this.user)) {
        //     this.startRefresh(true);
        // }
    }

    private getJson(response: Response) {
        if (response.status === 204) {
            return '';
        }
        return response.json();
    }

    useJwt() {
        this.user = JSON.parse(localStorage.getItem('currentUser'));
        if (!isNullOrUndefined(this.user)) {
            this.headers.set('Authorization', 'Bearer ' + this.user.token);
        }
    }

    private checkForError(response: Response): Response | Observable<any> {
        if (response.status >= 200 && response.status < 300) {
            return response;
        }
        const error = new Error(response.statusText);
        error['response'] = response;
        throw error;
    }

    public get(path: string): Observable<any> {
        this.useJwt();
        return this.http.get(`${this.baseURL}${path}`, {headers: this.headers})
            .map(this.checkForError)
            .catch( err => {
                this.check401(err);
                this.check403(err);
                return Observable.throw(err);
            })
            .map(this.getJson);
    }

    public post(path: string, body): Observable<any> {
        return this.http
            .post(
                `${this.baseURL}${path}`, JSON.stringify(body),
                {headers: this.headers})
            .map(this.checkForError)
            .catch( err => {
                this.check401(err);
                this.check403(err);
                return Observable.throw(err);
            })
            .map(this.getJson);
    }

    public put(path: string, body): Observable<any> {
        return this.http
            .put(
                `${this.baseURL}${path}`, JSON.stringify(body),
                {headers: this.headers})
            .map(this.checkForError)
            .catch( err => {
                this.check401(err);
                this.check403(err);
                return Observable.throw(err);
            })
            .map(this.getJson);
    }

    public delete(path): Observable<any> {
        this.useJwt();
        return this.http.delete(`${this.baseURL}${path}`, {headers: this.headers})
            .map(this.checkForError)
            .catch( err => {
                this.check401(err);
                this.check403(err);
                return Observable.throw(err);
            })
            .map(this.getJson);
    }

    public loginPost(path: string, body): Observable<any> {
        return this.http
            .post(
                `${this.baseURL}${path}`, JSON.stringify(body),
                {headers: this.headers})
            .map(this.checkForError)
            .map((response) => {
                this.startRefresh(false);
                return response;
            })
            .catch(err => Observable.throw(err));
    }

    public postWithFile(path: string, body,  file: File): Observable<any> {
        const user: User = JSON.parse(localStorage.getItem('currentUser'));
        const headers = new Headers({
            'Accept': 'application/json',
            'Authorization':  'Bearer ' + user.token
        });
        const  formData: FormData = new FormData();
        formData.append('file', file, file.name);

        if (body !== '' && body !== undefined && body !== null) {
            for (const property in body) {
                if (body.hasOwnProperty(property)) {
                    formData.append(property, body[property]);
                }
            }
        }

        return this.http
            .post(
                `${this.baseURL}${path}`, formData,
                {headers: headers})
            .map(this.checkForError)
            .catch( err => {
                this.check401(err);
                this.check403(err);
                return Observable.throw(err);
            })
            .map(this.getJson);
    }

    public downloadPDF(path: string): Observable<any> {
        const user: User = JSON.parse(localStorage.getItem('currentUser'));
        const headers = new Headers({
            'Accept': 'application/pdf',
            'Authorization':  'Bearer ' + user.token,
        });
        return this.http
            .get(
                `${this.baseURL}${path}`,
                {headers: headers, responseType: ResponseContentType.Blob})
            .map(this.checkForError)
            .catch( err => {
                this.check401(err);
                this.check403(err);
                return Observable.throw(err);
            })
            .map(
                (res) => {
                    return new Blob([res.blob()], { type: 'application/pdf' });
                });
    }

    private check401(err) {
        if (err.status === 401) {
            this.router.navigate(['/login']);
            this.alertService.error('La sesión ha expirado', false);
        }
    }

    private check403(err) {
        if (err.status === 403) {
            this.alertService.error('No tiene permitido realizar esta acción', false);
        }
    }

    private refreshToken() {
        this.useJwt();
        if (!isNullOrUndefined(this.user)) {
            this.http.get(this.baseURL + 'refresh', {headers: this.headers})
                .map(this.checkForError)
                .catch( err => {
                    this.check401(err);
                    this.check403(err);
                    return Observable.throw(err);
                })
                .subscribe( (response: Response) => {
                    // this.user.token = response.json()['token'];
                    // localStorage.setItem('currentUser', JSON.stringify(this.user));
                });
        }
    }

    private startRefresh(startInmediately: Boolean = false) {
        if (!isNullOrUndefined(this.timerSubscription)) {
            this.timerSubscription.unsubscribe();
        }
        if (startInmediately) {
            this.refreshToken();
        }
        // refrescar el token cada 25 mins mientras la aplicación esté activa
        this.timer = Observable.timer(1000 * 60 * 25, 1000 * 60 * 25);
        this.timerSubscription = this.timer.subscribe(() => {
            this.refreshToken();
        });
    }

    public logout() {
        if (!isNullOrUndefined(this.timerSubscription)) {
            this.timerSubscription.unsubscribe();
        }
        this.useJwt();
        if (!isNullOrUndefined(this.user)) {
            this.user = null;
            this.http.post(this.baseURL + 'logout', '', {headers: this.headers})
                .subscribe(() => {
                    localStorage.removeItem('currentUser');
                    this.headers.delete('Authorization');
                }, () => {
                    this.headers.delete('Authorization');
                });
        } else {
            this.headers.delete('Authorization');
        }
    }
}
