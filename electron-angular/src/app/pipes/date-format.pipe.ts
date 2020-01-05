import {Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

  public transform(value: any, format: string): string {
    let date = new Date(value);
    let m = moment(date);
    return m.format(format);
  }

}
