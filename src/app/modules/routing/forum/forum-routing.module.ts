import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ForumPageComponent} from './pages/forum-page/forum-page.component';

const routes: Routes = [
  {
    path: '',
    component: ForumPageComponent,
  },
  {
    path: 'view/:id',
    loadChildren: () => import('../post-view/post-view.module').then(m => m.PostViewModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ForumRoutingModule {}
