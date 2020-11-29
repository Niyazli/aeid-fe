import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForumRoutingModule } from './forum-routing.module';
import { ForumPageComponent } from './pages/forum-page/forum-page.component';
import { ForumBoxComponent } from './components/forum-box/forum-box.component';
import {MaterialModule} from '../../material/material.module';


@NgModule({
  declarations: [ForumPageComponent, ForumBoxComponent],
  imports: [
    CommonModule,
    ForumRoutingModule,
    MaterialModule
  ]
})
export class ForumModule { }
