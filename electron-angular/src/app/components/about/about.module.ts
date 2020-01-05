import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ComponentsModule} from '../../modules/components.module';
import {SharedModule} from '../../modules/shared.module';
import {AboutComponent} from './about.component';

let routes: Routes = [
  {
    path: '',
    component: AboutComponent
  }
];

@NgModule({
  declarations: [AboutComponent],
  imports: [
    SharedModule,
    ComponentsModule,
    RouterModule.forChild(routes)
  ]
})
export class AboutModule {
}
