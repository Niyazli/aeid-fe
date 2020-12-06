import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Observable} from 'rxjs';
import {MatTabGroup} from '@angular/material/tabs';
import {MatSelect} from '@angular/material/select';
import {filter, map} from 'rxjs/operators';
import {LocalizationService} from '../../services';
import {LanguageModel, TranslationModel, WordModel} from '../../models';
import {CreateTranslationDto, UpdateSeveralTranslationsDto} from '../../dtos';

@Component({
  templateUrl: './word-info.modal.html',
  styleUrls: ['./word-info.modal.scss'],
})
export class WordInfoModal implements OnInit {
  @ViewChild(MatTabGroup) tabGroup: MatTabGroup;
  @ViewChild('translationText') translationText: ElementRef<HTMLInputElement>;
  @ViewChild('selectedLanguage') selectedLanguage: MatSelect;
  $isLoading: Observable<boolean> = this.localizationService.$isLoading;
  $languages: Observable<LanguageModel[]> = this.localizationService.$languages;
  word: WordModel;
  selectedIndex: number;
  constructor(
    private readonly localizationService: LocalizationService,
    public dialog: MatDialogRef<WordInfoModal>,
    @Inject(MAT_DIALOG_DATA)
    public data: {id: string; translation?: TranslationModel}
  ) {}

  ngOnInit(): void {
    this.localizationService.getWordAdvanced({id: this.data.id}).subscribe(word => {
      this.word = word;
      if (this.data.translation) {
        this.selectedIndex = this.word.translations.indexOf(
          this.word.translations.find((t: TranslationModel) => t.id === this.data.translation?.id) as TranslationModel
        );
      }
    });
    this.localizationService.$wordChanged.subscribe((word: WordModel) => {
      if (word.id === this.word.id) {
        this.word = word;
      }
    });
  }
  getAvailableLanguages(): Observable<LanguageModel[]> {
    return this.$languages.pipe(
      filter(languages => languages.some(lng => lng.languageConfigurations.some(lc => lc.isActive))),
      map(languages =>
        languages.filter(l => {
          const langs: LanguageModel[] = this.word.translations.map(c => c.language);
          return !langs.some(lang => lang.id === l.id);
        })
      )
    );
  }
  handleTranslationUpdate(translation: TranslationModel): void {
    if (this.word) {
      this.localizationService.updateTranslation({
        wordId: this.word.id,
        translationId: translation.id,
        text: translation.text,
      });
    }
  }
  handleTranslationsUpdate(): void {
    const updateSeveralTranslationsDto: UpdateSeveralTranslationsDto = new UpdateSeveralTranslationsDto();
    updateSeveralTranslationsDto.wordId = this.word.id;
    updateSeveralTranslationsDto.translations = this.word.translations.map(t => {
      return {translationId: t.id, text: t.text};
    });
    this.localizationService.updateTranslations(updateSeveralTranslationsDto);
  }
  handleUntranslatedTab(): void {
    this.tabGroup.selectedIndex = this.word.translations.length;
  }
  addTranslation(): void {
    const createTranslationDto: Required<Partial<CreateTranslationDto>> = {
      wordId: this.word.id,
      languageId: this.selectedLanguage.value,
      text: this.translationText.nativeElement.value,
      page: null,
    };
    this.localizationService.addTranslation(createTranslationDto);
  }
}
