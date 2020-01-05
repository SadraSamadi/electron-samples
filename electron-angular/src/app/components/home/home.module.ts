import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ComponentsModule} from '../../modules/components.module';
import {SharedModule} from '../../modules/shared.module';
import {HomeComponent} from './home.component';

let routes: Routes = [
  {
    path: '',
    component: HomeComponent
  }
];

@NgModule({
  declarations: [HomeComponent],
  imports: [
    SharedModule,
    ComponentsModule,
    RouterModule.forChild(routes)
  ]
})
export class HomeModule {
}
