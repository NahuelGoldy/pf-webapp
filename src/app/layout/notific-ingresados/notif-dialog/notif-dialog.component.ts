import {Component, Input, OnInit} from '@angular/core';
import {ApiService} from '../../../shared/services/api.service';

@Component({
  selector: 'app-notif-dialog',
  templateUrl: './notif-dialog.component.html',
  styleUrls: ['./notif-dialog.component.scss']
})
export class NotifDialogComponent implements OnInit {

    @Input() parque_id;
    @Input() emails_list;

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
        if (this.emails_list.length > 0) {
            try {
                this.apiService.post('parques/' + this.parque_id + '/clientes/notificaciones', this.emails_list)
                    .subscribe( json => {
                        // hacer algo con la response?
                        this.submitted = false;
                        NotifDialogComponent.cerrarModal();
                    });
            } catch (e) {
                // hacer algo con el error?
                this.submitted = false;
                NotifDialogComponent.cerrarModal();
            }
        }
    }

    public close() {
        NotifDialogComponent.cerrarModal();
    }

}
