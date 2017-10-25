webpackJsonp([11],{"+/G8":function(e,t){e.exports='<app-page-header [heading]="\'Reporte estadístico de egresos\'" [icon]="\'fa-line-chart\'"></app-page-header>\r\n\r\n<div [@routerTransition]>\r\n    <div class="row">\r\n        <div class="col-md-12">\r\n            <h2>Reporte estadístico de Egresos</h2>\r\n            <hr>\r\n            <br>\r\n        </div>\r\n    </div>\r\n    <div class="row">\r\n        <div class="col-md-3">\r\n            <label class="control-label">Desde</label>\r\n            <form class="form-inline mb-3">\r\n                <my-date-picker name="mydateDesde" [options]="myDatePickerOptionsDesde"\r\n                                (dateChanged) ="onChangeDesde($event)"\r\n                                [(ngModel)]="modelDesde" required></my-date-picker>\r\n            </form>\r\n        </div>\r\n        <div class="col-md-3">\r\n            <label class="control-label">Hasta</label>\r\n            <form class="form-inline mb-3">\r\n                <my-date-picker name="mydateHasta" [options]="myDatePickerOptionsHasta"\r\n                                (dateChanged) ="onChangeHasta($event)"\r\n                                [(ngModel)]="modelHasta" required></my-date-picker>\r\n            </form>\r\n        </div>\r\n        <div class="col-md-2">\r\n            <label class="control-label">Intervalo</label>\r\n            <div class="form-group">\r\n                <select [(ngModel)]="modelIntervalo" class="form-control" (click)="onSelectClick($event.target.value)">\r\n                    <option [disabled]="disableHoras" class="active">Horas</option>\r\n                    <option [disabled]="disableDias" >Dias</option>\r\n                    <option [disabled]="disableSemanas" >Semanas</option>\r\n                    <option [disabled]="disableMes" >Meses</option>\r\n                    <option [disabled]="disableAnos" >Años</option>\r\n                </select>\r\n            </div>\r\n        </div>\r\n        <div class="col-md-2">\r\n            <button (click)="onGenerateClick()" class="btn btn-success alineado" >Generar Grafico</button>\r\n        </div>\r\n        <br>\r\n        <br>\r\n    </div>\r\n    <ngb-alert class="alert-warning" (close)="showAlert = false" *ngIf="showAlert" >\r\n        <strong>Datos incompletos.</strong> Por favor seleccione un rango de fechas.\r\n    </ngb-alert>\r\n    <div class="row">\r\n        <div class="col col-md-4">\r\n            <div class="card mb-3">\r\n                <div class="card-header">\r\n                    Información sobre Egresos\r\n                </div>\r\n                <div class="card-block">\r\n                    <div class="row">\r\n                        <div class="tile tile-darkbrown col-md-5">\r\n                            <label>{{promedioHora}}</label>\r\n                            <p>Egresos por hora</p>\r\n                        </div>\r\n                        <div class="tile tile-lightbrown col-md-5">\r\n                            <label>{{promedioDia}}</label>\r\n                            <p>Egresos por día</p>\r\n                        </div>\r\n                    </div>\r\n                    <div class="row">\r\n                        <div class="tile tile-orange col-md-5">\r\n                            <label>{{promedioTiempo}} hs</label>\r\n                            <p>Tiempo promedio</p>\r\n                        </div>\r\n                        <div class="tile tile-yellow col-md-5">\r\n                            <label>${{promedioCosto}}</label>\r\n                            <p>Costo promedio</p>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class="col col-md-8">\r\n            <div class="card mb-3">\r\n                <div class="card-header">Vehículos egresados</div>\r\n                <div class="card-block">\r\n                    <canvas baseChart height="130" [datasets]="lineChartData"\r\n                            [labels]="lineChartLabels" [options]="lineChartOptions"\r\n                            [colors]="lineChartColors" [legend]="lineChartLegend"\r\n                            [chartType]="lineChartType"\r\n                            (chartHover)="chartHovered($event)"\r\n                            (chartClick)="chartClicked($event)">\r\n                    </canvas>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n'},"3o2V":function(e,t,a){"use strict";var r=a("/oeL"),i=a("BkNc"),s=a("t98A");a.d(t,"a",function(){return l});var o=this&&this.__decorate||function(e,t,a,r){var i,s=arguments.length,o=s<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,a):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,r);else for(var n=e.length-1;n>=0;n--)(i=e[n])&&(o=(s<3?i(o):s>3?i(t,a,o):i(t,a))||o);return s>3&&o&&Object.defineProperty(t,a,o),o},n=[{path:"",component:s.a}],l=function(){function e(){}return e}();l=o([a.i(r.NgModule)({imports:[i.a.forChild(n)],exports:[i.a]})],l)},CLFL:function(e,t,a){t=e.exports=a("rP7Y")(!1),t.push([e.i,".btn.btn-success.alineado{position:relative;left:50%;top:35%}.tile{margin:3% 4%;text-align:center;color:#fff;font-family:Segoe UI Light}.tile-yellow{background-color:#d2a800}.tile-orange{background-color:#e67300}.tile-lightbrown{background-color:#bc8f8f}.tile-darkbrown{background-color:#695747}.tile p{font-size:.85em}.tile label{font-size:3.25em;font-weight:700}",""]),e.exports=e.exports.toString()},"h/ll":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a("/oeL"),i=a("qbdv"),s=a("UhLR"),o=(a.n(s),a("gOac")),n=a("3o2V"),l=a("t98A"),d=a("bm2B"),c=a("0WLp"),h=a("jJff");a.d(t,"Reporte2Module",function(){return f});var p=this&&this.__decorate||function(e,t,a,r){var i,s=arguments.length,o=s<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,a):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,r);else for(var n=e.length-1;n>=0;n--)(i=e[n])&&(o=(s<3?i(o):s>3?i(t,a,o):i(t,a))||o);return s>3&&o&&Object.defineProperty(t,a,o),o},f=function(){function e(){}return e}();f=p([a.i(r.NgModule)({imports:[i.k,s.ChartsModule,n.a,o.b,d.a,d.b,c.a.forRoot(),h.MyDatePickerModule],declarations:[l.a]})],f)},t98A:function(e,t,a){"use strict";var r=a("/oeL"),i=a("/lGx"),s=a("cpCA"),o=a("K28T"),n=a("uLa+"),l=a("5O89");a.d(t,"a",function(){return h});var d=this&&this.__decorate||function(e,t,a,r){var i,s=arguments.length,o=s<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,a):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,a,r);else for(var n=e.length-1;n>=0;n--)(i=e[n])&&(o=(s<3?i(o):s>3?i(t,a,o):i(t,a))||o);return s>3&&o&&Object.defineProperty(t,a,o),o},c=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},h=function(){function e(e,t){this.apiService=e,this.dateService=t,this.modelIntervalo="",this.disableAnos=!0,this.disableMes=!0,this.disableHoras=!0,this.disableDias=!0,this.disableSemanas=!0,this.promedioHora="-",this.promedioDia="-",this.promedioTiempo="-",this.promedioCosto="-",this.linearChartDataAux=[0,0,0],this.lineChartData=[{data:this.linearChartDataAux,label:"Egresos"}],this.chartLabels=[],this.lineChartLabels=["*","*"],this.lineChartOptions={responsive:!0},this.lineChartColors=[{backgroundColor:"rgba(255,69,0, 0.4)",borderColor:"rgba(77,83,96, 0.7)",pointBackgroundColor:"rgba(77,83,96,1)",pointBorderColor:"#4f79af",pointHoverBackgroundColor:"#44a354",pointHoverBorderColor:"rgba(77,83,96,1)"}],this.lineChartLegend=!0,this.lineChartType="line",this.today=new Date,this.showAlert=!1}return e.prototype.ngOnInit=function(){this.myDatePickerOptionsDesde={dateFormat:"dd/mm/yyyy",dayLabels:{su:"Dom",mo:"Lun",tu:"Mar",we:"Mié",th:"Jue",fr:"Vie",sa:"Sáb"},monthLabels:{1:"Ene",2:"Feb",3:"Mar",4:"Abr",5:"May",6:"Jun",7:"Jul",8:"Ago",9:"Sep",10:"Oct",11:"Nov",12:"Dic"},todayBtnTxt:"Hoy",showClearDateBtn:!0,editableDateField:!1,openSelectorOnInputClick:!0,alignSelectorRight:!1};var e=JSON.parse(JSON.stringify(this.myDatePickerOptionsDesde)),t=new Date(this.today.getTime()+864e5);console.log(t),e.disableSince={year:t.getFullYear(),month:t.getMonth()+1,day:t.getDate()},console.log(e),this.myDatePickerOptionsDesde=e,this.myDatePickerOptionsHasta=e},e.prototype.chartHovered=function(e){},e.prototype.chartClicked=function(e){},e.prototype.onChangeDesde=function(e){var t=JSON.parse(JSON.stringify(this.myDatePickerOptionsHasta));this.modelDesde=e;var a=new Date(1e3*this.modelDesde.epoc-864e5);t.disableUntil={year:a.getFullYear(),month:a.getMonth()+1,day:a.getDate()},this.myDatePickerOptionsHasta=t,this.modelHasta&&(this.difDays=this.dateService.dateDif(this.modelDesde,this.modelHasta),this.setSelect(this.difDays))},e.prototype.onChangeHasta=function(e){this.modelHasta=e,this.difDays=this.dateService.dateDif(this.modelDesde,this.modelHasta),this.setSelect(this.difDays)},e.prototype.onSelectClick=function(e){this.difDays=this.dateService.dateDif(this.modelDesde,this.modelHasta),this.setSelect(this.difDays),this.modelDesde||this.modelHasta?this.showAlert=!1:this.showAlert=!0},e.prototype.onGenerateClick=function(){var e=this,t=("0"+this.modelDesde.date.day).slice(-2)+"/"+("0"+this.modelDesde.date.month).slice(-2)+"/"+this.modelDesde.date.year+" 00:00:00",a=("0"+this.modelHasta.date.day).slice(-2)+"/"+("0"+this.modelHasta.date.month).slice(-2)+"/"+this.modelHasta.date.year+" 00:00:00",r=new i.a,o=new s.a;r.fechaFinal=a,r.fechaInicial=t,o=JSON.parse(localStorage.getItem("currentParking")),r.idEstacionamiento=o.idEstacionamiento,this.apiService.post("ingreso/egresoVehiculo/allByFechas",r).subscribe(function(t){e.ingresos=t,e.generateChar(),e.generateAverages()})},e.prototype.setSelect=function(e){e<32&&e>7?(this.disableHoras=!0,this.disableDias=!1,this.modelIntervalo="Dias",this.disableSemanas=!0,this.disableMes=!0):e>32&&e<128?(this.disableHoras=!0,this.disableDias=!0,this.disableSemanas=!1,this.modelIntervalo="Semanas",this.disableMes=!1):e>128?(this.disableMes=!1,this.modelIntervalo="Mes",this.disableHoras=!0,this.disableDias=!0,this.disableSemanas=!0):(this.disableHoras=!1,this.modelIntervalo="Horas",this.disableDias=!0,this.disableSemanas=!0,this.disableMes=!0)},e.prototype.generateChar=function(){"Horas"===this.modelIntervalo?this.graficoHoras():"Dias"===this.modelIntervalo?this.graficoDias():"Semanas"===this.modelIntervalo?this.graficoSem():"Mes"===this.modelIntervalo&&this.graficoMeses()},e.prototype.generateAverages=function(){var e=this.dateService.diffHours(this.modelDesde,this.modelHasta),t=this.dateService.diffDays(this.modelDesde,this.modelHasta);this.promedioHora=(this.ingresos.length/e).toFixed(2),this.promedioDia=t<3?"-":(this.ingresos.length/t).toFixed(2),this.calcularPromedioEstadias()},e.prototype.calcularPromedioEstadias=function(){var e=this,t=0;this.ingresos.forEach(function(a){t+=e.dateService.diffHours(a.fechaIngreso,a.fechaEgreso)}),this.promedioTiempo=Math.ceil(t/this.ingresos.length).toFixed(0);var a=JSON.parse(localStorage.getItem("currentParking"));this.promedioCosto=(Math.ceil(t/this.ingresos.length)*a.precioPorHora).toFixed(0)},e.prototype.arrayGenerator=function(e,t,a){for(var r=0;r<e;r++)"string"===t&&(a[r]?a[r]="-":a.push("+")),"number"===t&&(a[r]?a[r]=0:a.push(0));return a.length>e&&a.splice(e,a.length-e+1),a},e.prototype.graficoSem=function(){for(var e=this.arrayGenerator(this.difDays/7,"number",this.linearChartDataAux),t=this.arrayGenerator(this.difDays/7,"string",this.lineChartLabels),a=0,r=this.ingresos;a<r.length;a++){var i=r[a];console.log(new Date(i.fechaIngreso).getDay());e[+i.fechaIngreso.substr(0,10).slice(-2)]++}this.lineChartData=[{data:this.linearChartDataAux,label:"Ingresos"}],this.chartLabelsGenerator("Sem",1,t),this.lineChartLabels=t},e.prototype.graficoMeses=function(){},e.prototype.graficoDias=function(){for(var e=(this.arrayGenerator(this.difDays,"number",this.linearChartDataAux),this.arrayGenerator(this.difDays,"string",this.lineChartLabels)),t=0,a=this.ingresos;t<a.length;t++){var r=a[t],i=+r.fechaIngreso.substr(0,10).slice(-2);i-=+this.modelDesde.date.day,this.linearChartDataAux[i]++}this.lineChartData=[{data:this.linearChartDataAux,label:"Ingresos"}],this.chartLabelsGenerator("Dias",1,e),this.lineChartLabels=e},e.prototype.graficoHoras=function(){var e=1,t=0;this.difDays<4&&this.difDays>1?e=2:this.difDays<6&&this.difDays>3?e=4:this.difDays<8&&this.difDays>5&&(e=8);for(var a=this.arrayGenerator(24*this.difDays/e,"number",this.linearChartDataAux),r=this.arrayGenerator(24*this.difDays/e,"string",this.lineChartLabels),i=0,s=this.ingresos;i<s.length;i++){var o=s[i],n=+o.fechaIngreso.slice(-8).substr(0,2);t?(t+e>=n&&(t+=e),a[t]?a[t]++:a[t]=1):(t=n/e,a[t]=1)}this.lineChartData=[{data:a,label:"Ingresos"}],this.chartLabelsGenerator("Horas",e,r),this.lineChartLabels=r},e.prototype.chartLabelsGenerator=function(e,t,a){switch(e){case"Horas":for(var r=0,i=0;i<a.length;i++)a[i]=("0"+r).slice(-2)+":00",(r+=t)>=24&&(r=0);break;case"Dias":for(var s=0,i=0;i<a.length;i++)a[i]="Dia "+s,s+=t;break;case"Sem":for(var o=0,i=0;i<a.length;i++)a[i]="Sem. "+o,o+=t;break;case"Mes":for(var n=0,i=0;i<a.length;i++)a[i]="Mes "+n,n+=t}return a},e}();h=d([a.i(r.Component)({selector:"app-reporte-2",template:a("+/G8"),styles:[a("CLFL")],animations:[a.i(l.a)()]}),c("design:paramtypes",["function"==typeof(p=void 0!==o.a&&o.a)&&p||Object,"function"==typeof(f=void 0!==n.a&&n.a)&&f||Object])],h);var p,f}});