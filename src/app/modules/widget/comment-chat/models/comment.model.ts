export class CommentModel {
  author = 'Name Surname';
  updated = new Date();
  avatarUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9rZin0MNBpUNcaV7PtbjXwUEGszAIRE02cA&usqp=CAU';
  expanded = false;
  commentText?: string;
  replies?: CommentModel[];
  isNew: boolean;

  constructor(isNew = false, commentText?: string) {
    this.isNew = isNew;
    this.commentText = commentText;
  }
}
