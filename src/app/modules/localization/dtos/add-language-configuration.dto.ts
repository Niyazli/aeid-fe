import {ID} from '@datorama/akita';

class AddLanguageConfigurationDto {
  languageId: ID;
  isActive: boolean;
  isDefault: boolean;
  constructor({languageId, isDefault, isActive}: Partial<AddLanguageConfigurationDto>) {
    this.languageId = languageId ?? null as unknown as ID;
    this.isActive = isActive ?? false;
    this.isDefault = isDefault ?? false;
  }
}

export {AddLanguageConfigurationDto};
