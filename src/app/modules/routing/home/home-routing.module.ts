import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomepageComponent} from './pages/homepage/homepage.component';

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
        loadChildren: () => import('../../../modules/routing/video/video.module').then(m => m.VideoModule),
      },
      {
        path: 'podcast',
        loadChildren: () => import('../../../modules/routing/podcast/podcast.module').then(m => m.PodcastModule),
      },
      {
        path: 'forum',
        loadChildren: () => import('../../../modules/routing/forum/forum.module').then(m => m.ForumModule),
      },
      {
        path: 'help',
        loadChildren: () => import('../../../modules/routing/help/help.module').then(m => m.HelpModule),
      },
      {
        path: 'about',
        loadChildren: () => import('../../../modules/routing/about/about.module').then(m => m.AboutModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
