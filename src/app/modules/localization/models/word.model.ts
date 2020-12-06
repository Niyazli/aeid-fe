import { TranslationModel } from './translation.model';
import {WordBaseModel} from './word-base.model';

export class WordModel extends WordBaseModel {
  translations: TranslationModel[];
}
