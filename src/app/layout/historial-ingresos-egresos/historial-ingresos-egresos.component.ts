import {AfterViewChecked, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {ApiService} from '../../shared/services/api.service';
import {IngresoVehiculo} from '../../shared/domain/ingresoVehiculo';
import {Subject} from 'rxjs/Subject';
import {DataTableDirective} from 'angular-datatables';

@Component({
  selector: 'app-historial-ingresos-egresos',
  templateUrl: './historial-ingresos-egresos.component.html',
  styleUrls: ['./historial-ingresos-egresos.component.scss']
})
export class HistorialIngresosEgresosComponent implements OnInit, AfterViewChecked {

    ingreso: IngresoVehiculo = new IngresoVehiculo();
    historial: IngresoVehiculo[] = [];
    ocultarTabla = true;
    @ViewChild(DataTableDirective)
    dtElement: DataTableDirective;
    dtOptions: any = {};
    dtTrigger: Subject<any> = new Subject();

  constructor(private cdRef: ChangeDetectorRef, public apiService: ApiService) {
      const id = JSON.parse(localStorage.getItem('currentParking')).idEstacionamiento;
       this.apiService.get('ingreso/' + id).subscribe( json => {
           json.reverse();
           json.forEach(i => this.historial.push(i));
           this.ocultarTabla = false;
           this.dtTrigger.next();
      });
  }

    ngAfterViewChecked() {
        // explicit change detection to avoid "expression-has-changed-after-it-was-checked-error"
        this.cdRef.detectChanges();
    }

  ngOnInit() {
      this.dtOptions = {
          pagingType: 'full_numbers',
          autoWidth: true,
          paging : false,
          aaSorting: [0, 'DESC'],
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
          dom: 'Bfrti',
          buttons: [
              {
                  text: 'Filtros',
                  key: '1',
                  className: 'btn btn-success a-override',
                  action: () => {
                  }
              }
          ]
      };
  }

    private recargarTabla() {
        // TODO buscar otra forma de reflejar los cambios en la tabla
        this.ocultarTabla = true;
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            // Destroy the table first
            dtInstance.destroy();
            // Call the dtTrigger to rerender again
            this.dtTrigger.next();
            setTimeout(() => { this.ocultarTabla = false; }, 350);
        });
    }

}
