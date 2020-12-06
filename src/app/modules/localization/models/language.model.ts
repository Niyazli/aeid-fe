import { LanguageConfigurationModel } from './language-configuration.model';
import { BaseModel } from './base.model';

export class LanguageModel extends BaseModel {
  name: string;
  alpha2: string;
  languageConfigurations: LanguageConfigurationModel[];
}
