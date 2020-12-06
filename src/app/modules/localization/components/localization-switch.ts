import {LocalizationService} from '../services';
import {Observable} from 'rxjs';
import {LanguageModel} from '../models';

abstract class LocalizationSwitch {
  public $activeLanguage: Observable<LanguageModel> = this.localizationService.$activeLanguage;
  public $languages: Observable<LanguageModel[]> = this.localizationService.$languages;
  protected constructor(public localizationService: LocalizationService) {}
  public setActiveLanguage(language: LanguageModel): void {
    this.localizationService.setActiveLanguage(language);
  }
}

export {LocalizationSwitch};
