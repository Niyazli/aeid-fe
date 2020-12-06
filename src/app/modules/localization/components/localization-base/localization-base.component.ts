import {AfterViewInit, Component, HostListener, ViewChild} from '@angular/core';
import {MatDrawer} from '@angular/material/sidenav';
import {Observable} from 'rxjs';
import {LocalizationService} from '../../services';
import {ExtensionScaleModel} from '../../models';

@Component({
  selector: 'lib-localization-base',
  template: ``,
})
export class LocalizationBaseComponent implements AfterViewInit {
  $extensionScale: Observable<ExtensionScaleModel> = this.localizationService.$extensionScale;
  @ViewChild(MatDrawer) drawer: MatDrawer;
  constructor(private readonly localizationService: LocalizationService) {
    localizationService.getInitialData();
  }

  ngAfterViewInit(): void {
    this.drawer.openedChange.subscribe((opened: boolean) => {
      if (!opened && this.localizationService.extensionIsAvailable()) {
        this.localizationService.closeLocalization();
      }
    });
  }
  initialContentLoaded(): boolean {
    return this.localizationService.initialContentLoaded();
  }
  @HostListener('document:keydown', ['$event'])
  handleCtrlKeyDown(event: KeyboardEvent): void {
    if (this.localizationService.extensionIsAvailable() && (event.key === 'e' || event.key === 'у') && event.ctrlKey) {
      event.preventDefault();
      this.localizationService.openLocalization();
      this.drawer.open();
    }
  }
}
