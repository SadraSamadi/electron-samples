import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ComponentsModule} from '../../modules/components.module';
import {SharedModule} from '../../modules/shared.module';
import {PreferencesComponent} from './preferences.component';

let routes: Routes = [
  {
    path: '',
    component: PreferencesComponent
  }
];

@NgModule({
  declarations: [PreferencesComponent],
  imports: [
    SharedModule,
    ComponentsModule,
    RouterModule.forChild(routes)
  ]
})
export class PreferencesModule {
}
