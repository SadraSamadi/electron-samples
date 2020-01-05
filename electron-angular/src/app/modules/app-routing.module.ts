import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: '../components/home/home.module#HomeModule'
  },
  {
    path: 'preferences',
    loadChildren: '../components/preferences/preferences.module#PreferencesModule'
  },
  {
    path: 'about',
    loadChildren: '../components/about/about.module#AboutModule'
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
