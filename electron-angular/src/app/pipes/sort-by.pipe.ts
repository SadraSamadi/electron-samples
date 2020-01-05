import {Pipe, PipeTransform} from '@angular/core';
import * as _ from 'lodash';

@Pipe({
  name: 'sortBy'
})
export class SortByPipe implements PipeTransform {

  public transform(collection: any[], ...iteratees: any[]): any[] {
    return _.sortBy(collection, ...iteratees);
  }

}
