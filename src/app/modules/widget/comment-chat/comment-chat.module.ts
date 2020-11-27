import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CommentChatComponent} from './components/comment-chat/comment-chat.component';
import {SkeletonChatComponent} from './components/skeleton-chat/skeleton-chat.component';

@NgModule({
  declarations: [CommentChatComponent, SkeletonChatComponent],
  exports: [CommentChatComponent],
  imports: [CommonModule],
})
export class CommentChatModule {}
