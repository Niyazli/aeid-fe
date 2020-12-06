import {Component, OnInit} from '@angular/core';
import {LanguageModel} from '../../models/language.model';
import {Observable} from 'rxjs';
import {LocalizationService} from '../../services/localization.service';
import {MatDialog} from '@angular/material/dialog';
import {LanguageInfoModal} from './language-info/language-info.modal';
import {LanguageConfigurationModal} from './language-configuration/language-configuration.modal';

@Component({
  selector: 'lib-languages',
  templateUrl: './languages.page.html',
  styleUrls: ['./languages.page.scss'],
})
export class LanguagesPage implements OnInit {
  $languages: Observable<LanguageModel[]> = this.localizationService.$languages;

  constructor(private readonly localizationService: LocalizationService, private readonly dialog: MatDialog) {}

  ngOnInit(): void {}

  openLanguageModal(language?: LanguageModel): void {
    this.dialog.open(LanguageInfoModal, {
      width: '500px',
      data: {language},
    });
  }
  openConfigurationModal(language?: LanguageModel): void {
    this.dialog.open(LanguageConfigurationModal, {
      width: '500px',
      data: {language},
    });
  }
}
