import {Pipe, PipeTransform} from '@angular/core';
import * as _ from 'lodash';

@Pipe({
  name: 'filterBy'
})
export class FilterByPipe implements PipeTransform {

  public transform(collection: any[], predicate: any): any[] {
    return _.filter(collection, predicate);
  }

}
