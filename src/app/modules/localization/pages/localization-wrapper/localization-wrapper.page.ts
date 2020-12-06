import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {LocalizationAddonsService} from '../../services';

@Component({
  selector: 'lib-localization-wrapper',
  template: `
    <div class="localization-wrapper">
      <div class="localization-header" *ngIf="$header | async">
        <button mat-button color="primary" class="localization-header--button" (click)="navigateBack()">
          <mat-icon>arrow_back</mat-icon>
        </button>
        <h3 matSubheader>{{ $header | async }}</h3>
        <!--        <span class="localization-header&#45;&#45;label">{{ $header | async }}</span>-->
      </div>
      <router-outlet></router-outlet>
    </div>
  `,
  styleUrls: ['./localization-wrapper.page.scss'],
})
export class LocalizationWrapperPage {
  $header: Observable<string | null> = this.addonsService.$header;
  constructor(private readonly addonsService: LocalizationAddonsService, private router: Router) {}

  navigateBack(): void {
    this.addonsService.$header.next(null);
    this.router.navigate([{outlets: {localization: 'panel'}}]);
  }
}
