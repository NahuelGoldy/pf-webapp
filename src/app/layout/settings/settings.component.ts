import { Component, OnInit } from '@angular/core';
import {ParqueEstacionamiento} from '../../shared/domain/parqueEstacionamiento';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

    parqueEstacionamientoActual: ParqueEstacionamiento = new ParqueEstacionamiento();

  constructor() {
      this.parqueEstacionamientoActual = JSON.parse(localStorage.getItem('currentParking'));
  }

  ngOnInit() {
  }

}
