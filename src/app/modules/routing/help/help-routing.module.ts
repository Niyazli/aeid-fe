import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HelpPageComponent} from './pages/help-page/help-page.component';

const routes: Routes = [
  {
    path: '',
    component: HelpPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HelpRoutingModule {}
