export class CommentModel {
  author = 'Name Surname';
  updated = new Date();
  avatarUrl = 'https://www.pngkey.com/png/detail/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png';
  expanded = false;
  commentText?: string;
  replies?: CommentModel[];
  isNew: boolean;

  constructor(isNew = false) {
    this.isNew = isNew;
  }
}
