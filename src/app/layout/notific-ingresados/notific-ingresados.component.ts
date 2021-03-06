import {
    AfterViewChecked, ChangeDetectorRef, Component, HostListener, OnDestroy, OnInit,
    ViewChild
} from '@angular/core';
import {ParqueEstacionamiento} from '../../shared/domain/parqueEstacionamiento';
import {Subject} from 'rxjs/Subject';
import {DataTableDirective} from 'angular-datatables';
import {IngresoVehiculo} from '../../shared/domain/ingresoVehiculo';
import {ApiService} from '../../shared/services/api.service';
import {routerTransition} from '../../router.animations';
import {NotifDialogComponent} from './notif-dialog/notif-dialog.component';
import {isNullOrUndefined} from 'util';

@Component({
  selector: 'app-notific-ingresados',
  templateUrl: './notific-ingresados.component.html',
  styleUrls: ['./notific-ingresados.component.scss'],
  animations: [routerTransition()]
})
export class NotificIngresadosComponent implements OnInit, AfterViewChecked {

    ingresosActivos: IngresoVehiculo[] = [];
    emailAddresses: String[] = [];
    ocultarTabla = true;
    @ViewChild(DataTableDirective)
    dtElement: DataTableDirective;
    dtOptions: any = {};
    dtTrigger: Subject<any> = new Subject();
    parque: ParqueEstacionamiento;
    showModal = false;

  constructor(private cdRef: ChangeDetectorRef, public apiService: ApiService) {
      this.parque = JSON.parse(localStorage.getItem('currentParking'));

      this.apiService.get('ingreso/' + this.parque.idEstacionamiento)
          .subscribe( json => {
              json.forEach(x => {
                  // sólo agrego a los ingresos activos en este momento, que tengan un usuario, y cuyo usuario tenga una direccion de email registrada
                  if (!x.marcoSalidaDelParque && !isNullOrUndefined(x.vehiculoEstacionado.ownerVehiculo) && !isNullOrUndefined(x.vehiculoEstacionado.ownerVehiculo.email)) {
                      this.ingresosActivos.push(x);
                  }
              });
              this.ocultarTabla = false;
              this.dtTrigger.next();
          });
  }

  ngOnInit() {
      this.dtOptions = {
          pagingType: 'full_numbers',
          autoWidth: true,
          paging : true,
          sScrollX: '100%',
          // aaSorting: [0, 'ASC'],
          language: {
              'processing':     'Procesando...',
              'lengthMenu':     'Mostrar _MENU_ registros',
              'zeroRecords':    'No se encontraron resultados',
              'emptyTable':     'Ningún dato disponible en esta tabla',
              'info':           'Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros',
              'infoEmpty':      'Mostrando registros del 0 al 0 de un total de 0 registros',
              'infoFiltered':   '(filtrado de un total de _MAX_ registros)',
              'infoPostFix':    '',
              'search':         'Buscar:',
              'url':            '',
              // 'infoThousands':  ',',
              'loadingRecords': 'Cargando...',
              'paginate': {
                  'first':    'Primero',
                  'last':     'Último',
                  'next':     'Siguiente',
                  'previous': 'Anterior'
              },
              'aria': {
                  'sortAscending':  ': Activar para ordenar la columna de manera ascendente',
                  'sortDescending': ': Activar para ordenar la columna de manera descendente'
              }
          },
          columnDefs: [ {
              'targets': -1,
              'searchable': true,
              'orderable': true
          } ],
          dom: 'Bfrtp',
          buttons: [
              {

              },
              {
                  text: 'Emitir notificaciones',
                  key: '1',
                  className: 'btn btn-success a-override',
                  action: () => {
                      NotifDialogComponent.mostrarModal();
                  }
              },
              {

              }
          ]
      };
  }

    ngAfterViewChecked() {
        // explicit change detection to avoid "expression-has-changed-after-it-was-checked-error"
        this.cdRef.detectChanges();
    }

    toggleMail(ingreso: IngresoVehiculo) {
        const mail = ingreso.vehiculoEstacionado.ownerVehiculo.email;
        const indx = this.emailAddresses.indexOf(mail)
        if (indx === -1) {
            this.emailAddresses.push(mail);
        } else {
            this.emailAddresses.splice(indx, 1);
        }
    }

}
