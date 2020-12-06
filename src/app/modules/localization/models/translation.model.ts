import {BaseModel} from './base.model';
import {LanguageModel} from './language.model';
import {PageModel} from './page.model';
import {WordModel} from './word.model';

export class TranslationModel extends BaseModel {
  text: string;
  language: LanguageModel;
  page: PageModel;
  word: WordModel;
}
