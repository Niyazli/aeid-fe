import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {IPosition} from '../../interfaces/position.interface';
import {TooltipService} from '../../services/tooltip.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {WordModel} from '../../models/word.model';
import {LocalizationService} from '../../services/localization.service';
import {PageModel} from '../../models/page.model';
import {TooltipContentModel} from '../../models/tooltip-content.model';
import {MatDialog} from '@angular/material/dialog';
import {WordInfoModal} from '../word-info/word-info.modal';

export const FADE_ANIMATION = trigger('tooltip', [
  transition(':enter', [style({opacity: 0}), animate(300, style({opacity: 1}))]),
  transition(':leave', [animate(300, style({opacity: 0}))]),
]);

@Component({
  selector: 'localization-tooltip',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div @tooltip class="localization-tooltip">
      <div class="localization-tooltip-text">
        <em>{{ label }} ({{ keyword }})</em>
        <mat-progress-bar mode="indeterminate" *ngIf="localizationService.$isLoading | async"></mat-progress-bar>
      </div>
      <div class="localization-tooltip-actions">
        <button mat-icon-button *ngIf="!($word | async)" (click)="createSimple()"><mat-icon>add</mat-icon></button>
        <button mat-icon-button *ngIf="$word | async" (click)="edit()"><mat-icon>edit</mat-icon></button>
      </div>
    </div>
  `,
  styleUrls: ['./localization-tooltip.component.scss'],
  animations: [FADE_ANIMATION],
})
export class LocalizationTooltipComponent implements OnInit {
  @Input() label: string;
  @Input() keyword: string;
  @Input() $word: BehaviorSubject<WordModel | null> = new BehaviorSubject<WordModel | null>(null);

  position: IPosition;
  // tooltipContent: TooltipContentModel;
  page: PageModel;
  // $word: Observable<WordModel> = this.tooltipService.$tooltipWord;
  constructor(public tooltipService: TooltipService, public readonly localizationService: LocalizationService, private readonly dialog: MatDialog) {}

  ngOnInit(): void {
    this.tooltipService.tooltipPosition.subscribe(r => {
      // this.position = r;
    });
    this.tooltipService.tooltipInnerText.subscribe(r => {
      // this.tooltipContent = r;
    });
  }
  createSimple(): void {
    console.log(this.keyword);
    this.localizationService.createWord(this.keyword);
  }
  edit(): void {
    this.dialog.open(WordInfoModal, {
      width: '500px',
      data: {id: this.$word.getValue()?.id},
    });
  }
}
