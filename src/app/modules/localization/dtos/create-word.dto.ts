import {PageModel} from '../models/page.model';

export class CreateWordDto {
  keyword: string;
  page: PageModel;
  constructor({keyword, page}: CreateWordDto) {
    this.keyword = keyword;
    this.page = page;
  }
}
