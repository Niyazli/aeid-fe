import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VideoRoutingModule } from './video-routing.module';
import { VideoPageComponent } from './pages/video-page/video-page.component';
import { VideoBoxComponent } from './components/video-box/video-box.component';
import {MaterialModule} from '../../material/material.module';


@NgModule({
  declarations: [VideoPageComponent, VideoBoxComponent],
    imports: [
        CommonModule,
        VideoRoutingModule,
        MaterialModule
    ]
})
export class VideoModule { }
