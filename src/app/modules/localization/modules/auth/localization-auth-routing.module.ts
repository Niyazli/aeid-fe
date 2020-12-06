import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LocalizationLoginPage} from './pages';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LocalizationLoginPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LocalizationAuthRoutingModule {}
