import {Component, OnInit} from '@angular/core';
import {CommentModel} from '../../models/comment.model';

@Component({
  selector: 'ui-comment-chat',
  templateUrl: './comment-chat.component.html',
  styleUrls: ['./comment-chat.component.scss'],
})
export class CommentChatComponent implements OnInit {
  comments: CommentModel[] = [
    {
      author: 'Name Surname',
      updated: new Date(),
      avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9rZin0MNBpUNcaV7PtbjXwUEGszAIRE02cA&usqp=CAU',
      expanded: false,
      commentText:
        'By 1592 Shakespeare already enjoyed sufficient prominence as an author of dramatic scripts to have been the subject of Robert Greene’s attack on the “upstart crow” in Greene’s Groatsworth of Wit. Such renown as he enjoyed, however, was as transitory as the dramatic form. Play scripts, and their authors, were accorded a lowly status in the literary system, and when scripts were published, their link to the theatrical company (rather than to the scriptwriter) was publicized.',
      isNew: false,
      replies: [],
    },
    {
      author: 'Name Surname',
      updated: new Date(),
      avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9rZin0MNBpUNcaV7PtbjXwUEGszAIRE02cA&usqp=CAU',
      expanded: false,
      commentText:
        'Since the Romantic period the frank sexuality of Shakespeare’s Venus has held less appeal for literary critics and scholars than it had to Elizabethan and Jacobean readers.',
      isNew: false,
      replies: [
        {
          author: 'Name Surname',
          updated: new Date(),
          avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9rZin0MNBpUNcaV7PtbjXwUEGszAIRE02cA&usqp=CAU',
          expanded: false,
          commentText:
            'By 1592 Shakespeare already enjoyed sufficient prominence as an author of dramatic scripts to have been the subject of Robert Greene’s attack on the “upstart crow” in Greene’s Groatsworth of Wit. Such renown as he enjoyed, however, was as transitory as the dramatic form. Play scripts, and their authors, were accorded a lowly status in the literary system, and when scripts were published, their link to the theatrical company (rather than to the scriptwriter) was publicized.',
          isNew: false,
        },
      ],
    },
    {
      author: 'Name Surname',
      updated: new Date(),
      avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9rZin0MNBpUNcaV7PtbjXwUEGszAIRE02cA&usqp=CAU',
      expanded: false,
      commentText:
        'Shakespeare’s literary and social aspirations are revealed at every turn. In his Petrarchism, for example, he adopts a mode that had become a staple of courtly discourse. Elizabethan politicians figured themselves and their personal and political conditions in Petrarchan terms. The inescapable and enduring frustrations of the courtier’s life were habitually figured via the analogy of the frustrated, confused, but devoted Petrarchan lover. Yet Shakespeare’s approach to this convention typifies the 1590s younger generation’s sense of its incongruity.',
      isNew: false,
      replies: [],
    },
  ];

  constructor() {}

  ngOnInit(): void {}

  handleAddComment(value: string): void {
    console.log(value);
    this.comments.push(new CommentModel(false, value));
  }
}
