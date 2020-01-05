import {NgModule} from '@angular/core';
import {BgImageDirective} from '../directives/bg-image.directive';

@NgModule({
  declarations: [
    BgImageDirective
  ],
  exports: [
    BgImageDirective
  ]
})
export class DirectivesModule {
}
