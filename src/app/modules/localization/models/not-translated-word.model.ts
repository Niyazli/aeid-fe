import {PageModel} from './page.model';
import {WordBaseModel} from './word-base.model';


export class NotTranslatedWordModel extends WordBaseModel {
  isPlaceholder: boolean;
  page: PageModel;
}
