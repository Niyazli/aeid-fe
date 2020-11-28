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
      avatarUrl: 'https://www.pngkey.com/png/detail/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png',
      expanded: false,
      commentText:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis culpa eaque eligendi et exercitationem harum illo maxime nulla? Dolores eos excepturi, expedita harum nulla omnis pariatur quis sint vel voluptatum. Dolores molestias nihil numquam porro, sit soluta suscipit. Autem, quasi veniam? Aliquam amet consectetur nemo ratione repudiandae veniam! In, provident.',
      isNew: false,
      replies: [
        {
          author: 'Name Surname',
          updated: new Date(),
          avatarUrl: 'https://www.pngkey.com/png/detail/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png',
          expanded: false,
          commentText:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis culpa eaque eligendi et exercitationem harum illo maxime nulla? Dolores eos excepturi, expedita harum nulla omnis pariatur quis sint vel voluptatum. Dolores molestias nihil numquam porro, sit soluta suscipit. Autem, quasi veniam? Aliquam amet consectetur nemo ratione repudiandae veniam! In, provident.',
          isNew: false,
        },
      ],
    },
    {
      author: 'Name Surname',
      updated: new Date(),
      avatarUrl: 'https://www.pngkey.com/png/detail/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png',
      expanded: false,
      commentText:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis culpa eaque eligendi et exercitationem harum illo maxime nulla? Dolores eos excepturi, expedita harum nulla omnis pariatur quis sint vel voluptatum. Dolores molestias nihil numquam porro, sit soluta suscipit. Autem, quasi veniam? Aliquam amet consectetur nemo ratione repudiandae veniam! In, provident.',
      isNew: false,
      replies: [
        {
          author: 'Name Surname',
          updated: new Date(),
          avatarUrl: 'https://www.pngkey.com/png/detail/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png',
          expanded: false,
          commentText:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis culpa eaque eligendi et exercitationem harum illo maxime nulla? Dolores eos excepturi, expedita harum nulla omnis pariatur quis sint vel voluptatum. Dolores molestias nihil numquam porro, sit soluta suscipit. Autem, quasi veniam? Aliquam amet consectetur nemo ratione repudiandae veniam! In, provident.',
          isNew: false,
        },
      ],
    },
    {
      author: 'Name Surname',
      updated: new Date(),
      avatarUrl: 'https://www.pngkey.com/png/detail/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png',
      expanded: false,
      commentText:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis culpa eaque eligendi et exercitationem harum illo maxime nulla? Dolores eos excepturi, expedita harum nulla omnis pariatur quis sint vel voluptatum. Dolores molestias nihil numquam porro, sit soluta suscipit. Autem, quasi veniam? Aliquam amet consectetur nemo ratione repudiandae veniam! In, provident.',
      isNew: false,
      replies: [
        {
          author: 'Name Surname',
          updated: new Date(),
          avatarUrl: 'https://www.pngkey.com/png/detail/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png',
          expanded: false,
          commentText:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis culpa eaque eligendi et exercitationem harum illo maxime nulla? Dolores eos excepturi, expedita harum nulla omnis pariatur quis sint vel voluptatum. Dolores molestias nihil numquam porro, sit soluta suscipit. Autem, quasi veniam? Aliquam amet consectetur nemo ratione repudiandae veniam! In, provident.',
          isNew: false,
        },
      ],
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
