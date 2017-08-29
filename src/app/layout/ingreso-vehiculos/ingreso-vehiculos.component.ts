import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-ingreso-vehiculos',
  templateUrl: './ingreso-vehiculos.component.html',
  styleUrls: ['./ingreso-vehiculos.component.scss']
})
export class IngresoVehiculosComponent implements OnInit {
    // TODO cambiar esto, por un "objeto" (agregar al domain)
    patente: string;
    submitted = false;

  constructor() { }

  ngOnInit() {
  }

  onSubmitClicked() {
      this.submitted = true;
  }

}
