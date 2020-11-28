import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PublicRoutingModule} from './public-routing.module';
import {HomepageComponent} from './pages/homepage/homepage.component';
import {VideoPageComponent} from './pages/video-page/video-page.component';
import {LayoutModule} from '../layout/layout.module';
import {PageFilteringComponent} from './components/page-filtering/page-filtering.component';
import {MaterialModule} from '../material/material.module';
import {MatOptionModule} from '@angular/material/core';
import { VideoBoxComponent } from './pages/video-page/components/video-box/video-box.component';

@NgModule({
  declarations: [HomepageComponent, VideoPageComponent, PageFilteringComponent, VideoBoxComponent],
  imports: [CommonModule, PublicRoutingModule, LayoutModule, MaterialModule],
})
export class PublicModule {}
