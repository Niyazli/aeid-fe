import {ComponentRef, Directive, ElementRef, HostListener, Input, Renderer2} from '@angular/core';
import {LocalizationService} from '../services';
import {TooltipService} from '../services/tooltip.service';
import {WordModel, PositionModel, PageModel} from '../models';
import {Overlay, OverlayPositionBuilder, OverlayRef} from '@angular/cdk/overlay';
import {ComponentPortal} from '@angular/cdk/portal';
import {LocalizationTooltipComponent} from '../components';

@Directive({
  selector: '[localization]',
})
export class LocalizationDirective {
  private overlayRef: OverlayRef;
  private keyword: string;
  private _isPlaceholder: boolean;
  private prevBorderStyles: string;
  private prevDisplayStyles: string | null;
  private visible: boolean;
  @Input() set isPlaceholder(attribute: boolean | '') {
    this._isPlaceholder = attribute === '' || attribute;
  }
  get isPlaceholder(): boolean | '' {
    return this._isPlaceholder;
  }
  innerText: string;
  position: PositionModel;
  word: WordModel;
  constructor(
    private el: ElementRef<HTMLElement>,
    private overlay: Overlay,
    private overlayPositionBuilder: OverlayPositionBuilder,
    private readonly localizationService: LocalizationService,
    private readonly tooltipService: TooltipService,
    private renderer: Renderer2
  ) {
    this.prevDisplayStyles = this.el.nativeElement.getAttribute('display');
    this.localizationService.$activeLanguage.subscribe(() => {
      this.initDirective();
    });
    this.localizationService.$wordAdded.subscribe((word: WordModel) => this.handleWordAdd(word));
    this.localizationService.$wordChanged.subscribe((word: WordModel) => this.handleWordAdd(word));
    this.localizationService.$highlightToggled.subscribe((visible: boolean) => {
      this.visible = visible;
      this.handleHighlightToggle();
    });
  }
  private initDirective(): void {
    this.findWord();
  }
  private passWord(): void {
    if (!this.localizationService.$notTranslatedWords.getValue().some(w => w.keyword === this.getInnerText())) {
      this.renderer.setStyle(this.el.nativeElement, 'position', 'relative');
      this.localizationService.addWordAsNoTranslated({keyword: this.getInnerText(), isPlaceholder: this.isPlaceholder as boolean, page: null as unknown as PageModel});
    }
  }
  private findWord(): void {
    setTimeout(() => {
      this.findWordExecution();
    }, this.getTimeoutValue());
  }
  private getTimeoutValue(): number {
    return this.keyword ? 0 : this.getInnerText() === '' ? 500 : 0;
  }
  private findWordExecution(): void {
    if (!this.keyword) {
      this.keyword = this.getInnerText();
    }
    if (!this.prevBorderStyles) {
      this.prevBorderStyles = this.el.nativeElement.style.border;
    }
    this.word = this.localizationService.getWord({keyword: this.getInnerText()});
    this.word ? this.changeText() : this.passWord();
  }
  private changeText(): void {
    if (this.el.nativeElement.localName === 'mat-select') {
    }
    (this.el.nativeElement as any)[this.isPlaceholder ? 'placeholder' : 'innerText'] = this.localizationService.getInnerText({
      keyword: this.getInnerText(),
    });
    this.el.nativeElement.style.opacity = '1';
  }
  private handleWordAdd(word: WordModel): void {
    if (this.getInnerText() === word.keyword) {
      this.word = word;
      this.changeText();
      this.handleHighlightToggle();
    }
  }
  private getInnerText(): string {
    if (this.el.nativeElement.localName === 'mat-select') {
    }
    return this.keyword ? this.keyword : this.returnText();
  }
  private returnText(): string {
    return this.isPlaceholder ? (this.el.nativeElement as HTMLInputElement).placeholder : this.el.nativeElement.innerText;
  }
  private handleHighlightToggle(): void {
    this.el.nativeElement.style.opacity = '1';
    if (this.visible) {
      this.el.nativeElement.setAttribute('style', `border: ${this.getHighlightBorder()}`);
    } else {
      this.el.nativeElement.setAttribute('style', `border: ${this.prevBorderStyles}`);
    }
  }
  private getHighlightBorder(): string {
    return this.word ? '1px solid green !important' : '1px solid red !important';
  }
  @HostListener('mouseenter') show(): void {
    const user = this.localizationService.$user.getValue();
    if (user) {
      this.tooltipService.destroyTooltips();
      const positionStrategy = this.overlayPositionBuilder.flexibleConnectedTo(this.el).withPositions([
        {
          originX: 'center',
          originY: 'top',
          overlayX: 'center',
          overlayY: 'bottom',
          offsetY: -8,
        },
      ]);
      this.overlayRef = this.overlay.create({positionStrategy});
      const tooltipRef: ComponentRef<LocalizationTooltipComponent> = this.overlayRef.attach(new ComponentPortal(LocalizationTooltipComponent));
      this.tooltipService.addTooltip(tooltipRef);
      tooltipRef.instance.label = this.word ? this.word.keyword : 'Not created yet';
      tooltipRef.instance.keyword = this.getInnerText();
      tooltipRef.instance.$word.next(this.word);
      setTimeout(() => tooltipRef.destroy(), 5000);
    }
  }
}
