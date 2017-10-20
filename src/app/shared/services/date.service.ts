import { Injectable } from '@angular/core';

@Injectable()
export class DateService {

  constructor() { }

  public dateDif(dateDesde: any, dateHasta: any) {
      const desdeDate = new Date(dateDesde.epoc * 1000);

      const hastaDate = new Date(dateHasta.epoc * 1000);

      const difMilisecons = (hastaDate.getTime() - desdeDate.getTime()) ;
      if (difMilisecons > 1) {
          const difDays = difMilisecons / 86400000;
          return difDays;
      } else {
          return 0;
      }
  }

  public diffMilliseconds(dateDesde: any, dateHasta: any) {
      let desdeDate: Date, hastaDate: Date;
      if ((typeof dateDesde) === 'string' && (typeof dateHasta) === 'string') {
          desdeDate = new Date(dateDesde);
          hastaDate = new Date(dateHasta);
      } else {
          desdeDate = new Date(dateDesde.epoc * 1000);
          hastaDate = new Date(dateHasta.epoc * 1000);
      }
      return hastaDate.getTime() - desdeDate.getTime();
  }

  public diffHours(dateDesde: any, dateHasta: any) {
     return (this.diffMilliseconds(dateDesde, dateHasta) / 60000) / 60;
  }

  public diffDays(dateDesde: any, dateHasta: any) {
      return (this.diffHours(dateDesde, dateHasta)) / 24;
  }

  public diffWeeks(dateDesde: any, dateHasta: any) {
      return (this.diffDays(dateDesde, dateHasta)) / 7;
  }

  public diffMonths(dateDesde: any, dateHasta: any) {
      return (this.diffDays(dateDesde, dateHasta)) / 30;
  }
}
