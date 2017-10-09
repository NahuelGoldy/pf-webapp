import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ApiService} from '../shared/services/api.service';
import {User} from '../shared/domain/usuario';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
    user: User;

    constructor(public router: Router,
                public apiService: ApiService) {
        this.user = JSON.parse(localStorage.getItem('currentUser'));
        this.apiService.get('parques/admin/' + this.user.idUsuario).subscribe( json => {
                // TODO guardar/setear/mostrar la info del parque actual (viene en el json)
                localStorage.setItem('currentParking', JSON.stringify(json));
                // console.log(json);
            });
    }

    ngOnInit() {
        if (this.router.url === '/') {
            this.router.navigate(['/reportes/reporte-anual']);
        }
    }
}
