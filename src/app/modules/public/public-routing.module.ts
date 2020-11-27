import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomepageComponent} from './pages/homepage/homepage.component';
import {VideoPageComponent} from './pages/video-page/video-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'video',
    pathMatch: 'full',
  },
  {
    path: '',
    component: HomepageComponent,
    children: [
      {
        path: 'video',
        component: VideoPageComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicRoutingModule {}
