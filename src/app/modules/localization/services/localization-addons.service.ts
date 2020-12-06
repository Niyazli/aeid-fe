import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {ActivatedRoute, Router, ActivationEnd} from '@angular/router';
import {LocalizationAddonModel} from '../models/localization-addon.model';
import {LocalizationAuthService} from './localization-auth.service';
import {LocalizationExtensionService} from './localization-extension.service';
import {ExtensionScaleModel} from '../models/extension-scale.model';

@Injectable({
  providedIn: 'root',
})
export class LocalizationAddonsService {
  $addons: BehaviorSubject<LocalizationAddonModel[]> = new BehaviorSubject<LocalizationAddonModel[]>([]);
  $header: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly localizationExtensionService: LocalizationExtensionService,
    private readonly localizationAuthService: LocalizationAuthService
  ) {
    this.localizationAuthService.$isLoggedIn.subscribe((state: boolean) => {
      if (state) {
        this.initAddons();
      } else {
        this.initAuthAddons();
      }
    });
  }
  initAuthAddons(): void {
    const addons: LocalizationAddonModel[] = [];
    addons.push(new LocalizationAddonModel({label: 'Login', route: 'auth/login', isAvailable: true, isImplemented: true}));
    addons.push(new LocalizationAddonModel({label: 'Request Access', route: 'auth/request', isAvailable: true, isImplemented: true}));
    this.$addons.next(addons);
  }
  initAddons(): void {
    const addons: LocalizationAddonModel[] = [];
    addons.push(new LocalizationAddonModel({label: 'Languages', route: 'languages', isAvailable: true, isImplemented: true}));
    addons.push(new LocalizationAddonModel({label: 'Words', route: 'words', isAvailable: true, isImplemented: true, type: 'counter'}));
    addons.push(new LocalizationAddonModel({label: 'Translations', route: 'translations', isAvailable: true, isImplemented: true}));
    addons.push(new LocalizationAddonModel({label: 'Translation Request', route: 'translations', isAvailable: true, isImplemented: false}));
    addons.push(new LocalizationAddonModel({label: 'Pages', route: 'pages', isAvailable: true, isImplemented: true}));
    addons.push(new LocalizationAddonModel({label: 'Projects', route: 'projects', isAvailable: true, isImplemented: true}));
    addons.push(new LocalizationAddonModel({label: 'Team', route: 'team', isAvailable: true, isImplemented: false}));
    addons.push(new LocalizationAddonModel({label: 'Toggle Highlight', isAvailable: true, isImplemented: true, type: 'toggle-highlight'}));
    addons.push(new LocalizationAddonModel({label: 'Change Scale', isAvailable: true, isImplemented: true, type: 'scale'}));
    this.$addons.next(addons);
  }
  handleAddonAction(addon: LocalizationAddonModel): void {
    switch (addon.type) {
      case 'scale':
        const scale: Partial<ExtensionScaleModel> = this.calculateScale();
        this.localizationExtensionService.$extensionScale.next({width: scale.width ?? '480px'});
        break;
      case 'toggle-highlight':
        this.localizationExtensionService.$highlightToggled.next(!this.localizationExtensionService.$highlightToggled.getValue());
        break;
      default:
        this.router.navigate([{outlets: {localization: 'panel/' + addon.route}}]);
        this.router.events.subscribe((event: any) => {
          if (event instanceof ActivationEnd && event.snapshot.outlet === 'localization') {
            const addonInSubject = this.$addons
              .getValue()
              .find((add: LocalizationAddonModel) => add.route === event?.snapshot?.children?.find(Boolean)?.routeConfig?.path);
            this.$header.next(addonInSubject?.label ?? null);
          }
        });
        break;
    }
  }
  private calculateScale(): Partial<ExtensionScaleModel> {
    const currentWidth = this.localizationExtensionService.$extensionScale.getValue().width;
    const nextWidth: Pick<ExtensionScaleModel, 'width'> = {width: null};
    switch (currentWidth) {
      case '480px':
        nextWidth.width = '680px';
        break;
      case '680px':
        nextWidth.width = '1200px';
        break;
      case '1200px':
        nextWidth.width = '480px';
        break;
    }
    return nextWidth;
  }
}
