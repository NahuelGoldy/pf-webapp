import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-egreso-vehiculos',
  templateUrl: './egreso-vehiculos.component.html',
  styleUrls: ['./egreso-vehiculos.component.scss']
})
export class EgresoVehiculosComponent implements OnInit {
    closeAlert = false;
    submittedExitoso = false;
    submitted = false;
    nroPatente;
  constructor() { }

    ngOnInit() {
    }

    onSubmitClicked() {
        this.closeAlert = false;
        this.submittedExitoso = true;
        this.submitted = true;
    }

}
