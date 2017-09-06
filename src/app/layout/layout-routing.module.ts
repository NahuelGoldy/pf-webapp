import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
            { path: 'charts', loadChildren: './charts/charts.module#ChartsModule' },
            { path: 'tables', loadChildren: './tables/tables.module#TablesModule' },
            { path: 'forms', loadChildren: './form/form.module#FormModule' },
            { path: 'bs-element', loadChildren: './bs-element/bs-element.module#BsElementModule' },
            { path: 'grid', loadChildren: './grid/grid.module#GridModule' },
            { path: 'components', loadChildren: './bs-component/bs-component.module#BsComponentModule' },
            { path: 'blank-page', loadChildren: './blank-page/blank-page.module#BlankPageModule' },
            { path: 'ingreso-egreso/ingreso', loadChildren: './ingreso-vehiculos/ingreso-vehiculos.module#IngresoVehiculosModule' },
            { path: 'ingreso-egreso/egreso', loadChildren: './egreso-vehiculos/egreso-vehiculos.module#EgresoVehiculosModule' },
            { path: 'ingreso-egreso/notificar', loadChildren: './notific-ingresados/notific-ingresados.module#NotificIngresadosModule' },
            { path: 'ingreso-egreso/historial',
                loadChildren: './historial-ingresos-egresos/historial-ingresos-egresos.module#HistorialIngresosEgresosModule' },
            { path: 'settings', loadChildren: './settings/settings.module#SettingsModule' },
            { path: 'admin-panel', loadChildren: './admin-panel/admin-panel.module#AdminPanelModule' },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule { }
