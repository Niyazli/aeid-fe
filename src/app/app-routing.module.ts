import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {loadLocalization} from './modules/localization';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () => import('./modules/routing/home/home.module').then(m => m.HomeModule),
  },
  {
    path: 'localization',
    outlet: 'localization',
    loadChildren: loadLocalization,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
