import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutRoutingModule } from './about-routing.module';
import { AboutPageComponent } from './pages/about-page/about-page.component';
import {LocalizationModule} from '../../localization';


@NgModule({
  declarations: [AboutPageComponent],
  imports: [
    CommonModule,
    AboutRoutingModule,
    LocalizationModule
  ]
})
export class AboutModule { }
