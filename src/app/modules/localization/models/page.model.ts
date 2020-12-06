import {IPage} from '../interfaces/page.interface';
import {BaseModel} from './base.model';

export class PageModel extends BaseModel implements IPage {
  name: string;
  path: string;
  constructor({name, path}: PageModel) {
    super();
    this.name = name;
    this.path = path;
  }
}
