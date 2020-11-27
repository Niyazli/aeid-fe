import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LayoutComponent} from './components/layout/layout.component';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {HeaderComponent} from './components/header/header.component';
import {MaterialModule} from '../material/material.module';
import {CommentChatModule} from '../widget/comment-chat/comment-chat.module';
import {SharedModule} from '../shared/shared.module';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [LayoutComponent, SidebarComponent, HeaderComponent],
  imports: [CommonModule, MaterialModule, CommentChatModule, SharedModule, RouterModule],
  exports: [LayoutComponent],
})
export class LayoutModule {}
