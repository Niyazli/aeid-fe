import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { VideoPageComponent } from './pages/video-page/video-page.component';
import {LayoutModule} from '../layout/layout.module';


@NgModule({
  declarations: [HomepageComponent, VideoPageComponent],
  imports: [
    CommonModule,
    PublicRoutingModule,
    LayoutModule
  ]
})
export class PublicModule { }
