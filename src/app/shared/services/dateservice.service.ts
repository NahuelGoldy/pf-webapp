import { Injectable } from '@angular/core';
import {IMyDate} from 'mydatepicker';

@Injectable()
export class DateserviceService {

  constructor() { }

  public dateDif(dateDesde: any, dateHasta: any) {
      const desdeDate = new Date(dateDesde.epoc * 1000);

      const hastaDate = new Date(dateHasta.epoc * 1000);


      const difMilisecons = (hastaDate.getTime() - desdeDate.getTime()) ;
      if (difMilisecons > 1) {
          const difDays = difMilisecons / 86400000;
          return difDays;
      } else {
          return 1;
      }

  }
}
