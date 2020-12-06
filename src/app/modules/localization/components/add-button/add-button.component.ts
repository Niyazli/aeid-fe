import {Component, OnInit} from '@angular/core';
import {LocalizationService} from '../../services/localization.service';

@Component({
  selector: 'add-button',
  template: `<button class="localization-add-button" mat-icon-button (click)="createSimple()"><mat-icon>add</mat-icon></button>`,
  styleUrls: ['add-button.component.scss'],
})
export class AddButtonComponent implements OnInit {
  constructor(public readonly localizationService: LocalizationService) {}

  ngOnInit() {}

  createSimple() {
    this.localizationService.createWord('');
  }
}
