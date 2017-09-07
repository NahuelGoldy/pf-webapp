import { Component, OnInit } from '@angular/core';
import {ParqueEstacionamiento} from '../../shared/domain/parqueEstacionamiento';
import {routerTransition} from '../../router.animations';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  animations: [routerTransition()]
})
export class SettingsComponent implements OnInit {

    parqueEstacionamientoActual: ParqueEstacionamiento = new ParqueEstacionamiento();

  constructor() {
      this.parqueEstacionamientoActual = JSON.parse(localStorage.getItem('currentParking'));
  }

  ngOnInit() {
  }

}
