import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {VideoPageComponent} from './pages/video-page/video-page.component';

const routes: Routes = [
  {
    path: '',
    component: VideoPageComponent,
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
export class VideoRoutingModule {}
