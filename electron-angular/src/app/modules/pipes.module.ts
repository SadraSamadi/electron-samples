import {NgModule} from '@angular/core';
import {DateFormatPipe} from '../pipes/date-format.pipe';
import {FilterByPipe} from '../pipes/filter-by.pipe';
import {ShufflePipe} from '../pipes/shuffle.pipe';
import {SortByPipe} from '../pipes/sort-by.pipe';
import {TMDbImagePipe} from '../pipes/tmdb-image.pipe';

@NgModule({
  declarations: [
    DateFormatPipe,
    FilterByPipe,
    ShufflePipe,
    SortByPipe,
    TMDbImagePipe
  ],
  exports: [
    DateFormatPipe,
    FilterByPipe,
    ShufflePipe,
    SortByPipe,
    TMDbImagePipe
  ]
})
export class PipesModule {
}
