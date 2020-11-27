import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LayoutComponent} from './components/layout/layout.component';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {HeaderComponent} from './components/header/header.component';
import {MaterialModule} from '../material/material.module';
import {CommentChatModule} from '../widget/comment-chat/comment-chat.module';

@NgModule({
  declarations: [LayoutComponent, SidebarComponent, HeaderComponent],
  imports: [CommonModule, MaterialModule, CommentChatModule],
  exports: [LayoutComponent],
})
export class LayoutModule {}
