import {NgModule} from '@angular/core';
import {LoadingComponent} from '../components/loading/loading.component';
import {MovieDetailsComponent} from '../components/movie-details/movie-details.component';
import {MovieSearchComponent} from '../components/movie-search/movie-search.component';
import {SharedModule} from './shared.module';

@NgModule({
  declarations: [
    LoadingComponent,
    MovieDetailsComponent,
    MovieSearchComponent
  ],
  entryComponents: [
    LoadingComponent,
    MovieSearchComponent
  ],
  imports: [SharedModule],
  exports: [
    MovieDetailsComponent
  ]
})
export class ComponentsModule {
}
