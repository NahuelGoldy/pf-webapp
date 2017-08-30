import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ApiService} from '../shared/services/api.service';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

    constructor(public router: Router,
                public apiService: ApiService) {
        const user = JSON.parse(localStorage.getItem('currentUser'));
        this.apiService.get('parques/admin/' + user.idUsuario).subscribe( json =>
            // TODO guardar/setear/mostrar la info del parque actual (viene en el json)
            console.log(json)
        );
    }

    ngOnInit() {
        if (this.router.url === '/') {
            this.router.navigate(['/dashboard']);
        }
    }

}
