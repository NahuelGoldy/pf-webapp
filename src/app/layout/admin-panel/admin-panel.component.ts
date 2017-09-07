import { Component, OnInit } from '@angular/core';
import {ParqueEstacionamiento} from '../../shared/domain/parqueEstacionamiento';
import {User} from '../../shared/domain/usuario';
import {routerTransition} from '../../router.animations';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss'],
  animations: [routerTransition()]
})
export class AdminPanelComponent implements OnInit {
    parque: ParqueEstacionamiento = new ParqueEstacionamiento();
    showOptional = false;
    usuario: User = new User();
  constructor() {
  }

  ngOnInit() {
  }
  toggleShowOptional() {
        this.showOptional = !this.showOptional;
    }
    onCleanClicked() {
        this.parque = new ParqueEstacionamiento();
    }
    onSubmitClicked() {    }
}
