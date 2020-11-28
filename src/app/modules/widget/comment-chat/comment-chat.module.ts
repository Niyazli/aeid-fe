import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CommentChatComponent} from './components/comment-chat/comment-chat.component';
import {SkeletonChatComponent} from './components/skeleton-chat/skeleton-chat.component';
import {MaterialModule} from '../../material/material.module';
import { CommentBoxComponent } from './components/comment-box/comment-box.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [CommentChatComponent, SkeletonChatComponent, CommentBoxComponent],
  exports: [CommentChatComponent],
  imports: [CommonModule, MaterialModule, FormsModule],
})
export class CommentChatModule {}
