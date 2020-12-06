import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {LanguageModel} from '../../../models';
import {Observable} from 'rxjs';
import {LocalizationService} from '../../../services';
import {AddLanguageConfigurationDto} from '../../../dtos';

@Component({
  selector: 'app-language-configuration',
  templateUrl: './language-configuration.modal.html',
  styleUrls: ['./language-configuration.modal.scss'],
})
export class LanguageConfigurationModal implements OnInit {
  language: LanguageModel = new LanguageModel();
  configuration: AddLanguageConfigurationDto = new AddLanguageConfigurationDto({});
  $languages: Observable<LanguageModel[]> = this.localizationService.$allLanguages;
  constructor(
    private localizationService: LocalizationService,
    public dialog: MatDialogRef<LanguageConfigurationModal>,
    @Inject(MAT_DIALOG_DATA)
    public data: {language: LanguageModel}
  ) {}

  ngOnInit(): void {
    if (this.data && this.data.language) {
      this.language = {...this.data.language};
    }
  }
  save(): void {
    this.localizationService.addLanguageConfiguration(this.configuration);
    this.dialog.close();
  }
}
