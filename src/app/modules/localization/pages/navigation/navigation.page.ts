import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {ExtensionScaleModel, LocalizationAddonModel} from '../../models';
import {LocalizationAddonsService, LocalizationService} from '../../services';

@Component({
  selector: 'lib-navigatiom',
  template: `
    <mat-list role="list">
      <mat-list-item role="listitem" class="pointer" *ngFor="let addon of $addons | async" (click)="handleAddonAction(addon)">
        <mat-icon mat-list-icon>folder</mat-icon>
        <div mat-line>{{ addon.label }}</div>
        <div class="text-danger" mat-line *ngIf="addon.isCounter()">{{ $wordsTranslated | async }} / {{ $wordsCount | async }}</div>
        <div class="text-danger" mat-line *ngIf="!addon.isImplemented">Coming soon</div>
        <div class="text-danger" mat-line *ngIf="addon.isScale()">{{ ($currentScale | async)?.width }}</div>
        <div class="text-danger" mat-line *ngIf="addon.isHighlight()">{{ ($highlighted | async) ? 'on' : 'off' }}</div>
        <mat-divider></mat-divider>
      </mat-list-item>
    </mat-list>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./navigation.page.scss'],
})
export class NavigationPage {
  $addons: Observable<LocalizationAddonModel[]> = this.addonsService.$addons;
  $wordsCount: Observable<number> = this.localizationService.$wordsCount;
  $wordsTranslated: Observable<number> = this.localizationService.$wordsTranslated;
  $currentScale: Observable<ExtensionScaleModel> = this.localizationService.$extensionScale;
  $highlighted: Observable<boolean> = this.localizationService.$highlightToggled;
  constructor(private readonly localizationService: LocalizationService, private readonly addonsService: LocalizationAddonsService) {}
  handleAddonAction(addon: LocalizationAddonModel) {
    this.addonsService.handleAddonAction(addon);
  }
}
