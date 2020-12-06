import {Component, OnInit} from '@angular/core';
import {LocalizationService, LocalizationSwitch} from '../../../localization';

@Component({
  selector: 'ui-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent extends LocalizationSwitch implements OnInit {
  constructor(localizationService: LocalizationService) {
    super(localizationService);
  }

  ngOnInit(): void {}
}
