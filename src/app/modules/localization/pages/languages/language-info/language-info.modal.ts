import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {LanguageModel} from '../../../models/language.model';
import {LocalizationService} from '../../../services/localization.service';

@Component({
  templateUrl: './language-info.modal.html',
  styleUrls: ['./language-info.modal.scss'],
})
export class LanguageInfoModal implements OnInit {
  language: LanguageModel = new LanguageModel();
  constructor(
    private readonly localizationService: LocalizationService,
    public dialog: MatDialogRef<LanguageInfoModal>,
    @Inject(MAT_DIALOG_DATA)
    public data: {language: LanguageModel}
  ) {}

  ngOnInit(): void {
    if (this.data && this.data.language) {
      this.language = {...this.data.language};
    }
  }

  save(): void {
    this.language.id
      ? this.localizationService.updateLanguge(this.language)
      : this.localizationService.createLanguage(this.language.name, this.language.alpha2);
    this.dialog.close();
  }
}
