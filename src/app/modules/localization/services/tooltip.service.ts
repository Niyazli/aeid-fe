import {ComponentRef, Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {WordModel} from '../models/word.model';
import {PositionModel} from '../models/position.model';
import {TooltipContentModel} from '../models/tooltip-content.model';
import {LocalizationTooltipComponent} from '../components/localization-tooltip/localization-tooltip.component';

@Injectable({
  providedIn: 'root',
})
export class TooltipService {
  tooltipPosition: Subject<PositionModel> = new Subject<PositionModel>();
  tooltipInnerText: Subject<TooltipContentModel> = new Subject<TooltipContentModel>();
  $tooltipWord: BehaviorSubject<WordModel | null> = new BehaviorSubject<WordModel | null>(null);
  tooltips: ComponentRef<LocalizationTooltipComponent>[] = [];
  constructor() {}
  triggerTooltip(word: WordModel): void {
    this.$tooltipWord.next(word);
  }
  addTooltip(tooltip: ComponentRef<LocalizationTooltipComponent>): void {
    this.tooltips.push(tooltip);
  }
  destroyTooltips(): void {
    this.tooltips.forEach(t => t.destroy());
  }
}
