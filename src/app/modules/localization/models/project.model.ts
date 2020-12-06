import {BaseModel} from './base.model';
import {LanguageModel} from './language.model';

export class ProjectModel extends BaseModel {
  name: string;
  path: string;
  origin: string;
  language: LanguageModel;
}
