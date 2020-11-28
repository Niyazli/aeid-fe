import {Component, Input, OnInit} from '@angular/core';
import {CommentModel} from '../../models/comment.model';

@Component({
  selector: '[ui-comment-box]',
  templateUrl: './comment-box.component.html',
  styleUrls: ['./comment-box.component.scss'],
})
export class CommentBoxComponent implements OnInit {
  @Input() comment: CommentModel = new CommentModel();
  @Input() hideAction = false;
  @Input() index = 0;

  constructor() {}

  ngOnInit(): void {}

  handleReply(): void {
    this.comment?.replies?.push(new CommentModel(true));
  }
}
