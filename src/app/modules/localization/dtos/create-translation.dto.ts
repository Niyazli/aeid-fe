import {PageModel} from '../models';

export class CreateTranslationDto {
  wordId: string;
  languageId: string;
  text: string;
  page: PageModel | null;
  constructor({wordId, languageId, text, page}: Required<Partial<CreateTranslationDto>>) {
    this.wordId = wordId;
    this.languageId = languageId;
    this.text = text;
    this.page = page;
  }
}
