import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PodcastRoutingModule } from './podcast-routing.module';
import { PodcastPageComponent } from './pages/podcast-page/podcast-page.component';
import { PodcastBoxComponent } from './components/podcast-box/podcast-box.component';
import {MaterialModule} from '../../material/material.module';


@NgModule({
  declarations: [PodcastPageComponent, PodcastBoxComponent],
  imports: [
    CommonModule,
    PodcastRoutingModule,
    MaterialModule
  ]
})
export class PodcastModule { }
