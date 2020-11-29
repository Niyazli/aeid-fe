import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostViewRoutingModule } from './post-view-routing.module';
import { PostPageComponent } from './pages/post-page/post-page.component';
import {MaterialModule} from '../../material/material.module';
import { PostContentComponent } from './components/post-content/post-content.component';


@NgModule({
  declarations: [PostPageComponent, PostContentComponent],
  imports: [
    CommonModule,
    PostViewRoutingModule,
    MaterialModule
  ]
})
export class PostViewModule { }
