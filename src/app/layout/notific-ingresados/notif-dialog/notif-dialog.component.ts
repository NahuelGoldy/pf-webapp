import {Component, Input, OnInit} from '@angular/core';
import {ApiService} from '../../../shared/services/api.service';

@Component({
  selector: 'app-notif-dialog',
  templateUrl: './notif-dialog.component.html',
  styleUrls: ['./notif-dialog.component.scss']
})
export class NotifDialogComponent implements OnInit {

    @Input() parque_id;

    submitted = false;

    static mostrarModal() {
        (<any>$('#modalSendNotif')).modal('show');
    }

    static cerrarModal() {
        (<any>$('#modalSendNotif')).modal('hide');
    }

  constructor(public apiService: ApiService) { }

  ngOnInit() {
  }

    public sendEmails() {
        this.submitted = true;
        this.apiService.get('parques/' + this.parque_id + '/clientes/notificaciones')
            .subscribe( json => {
                // hacer algo con la response?
                this.submitted = false;
            });
    }

    public close() {
        NotifDialogComponent.cerrarModal();
    }

}
