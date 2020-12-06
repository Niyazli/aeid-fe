import {AddonAction} from '../types/addon-action.type';

export class LocalizationAddonModel {
  label: string | undefined;
  route: string | undefined;
  isAvailable: boolean | undefined;
  isImplemented: boolean;
  type?: AddonAction;
  subAddons: LocalizationAddonModel[];
  constructor({label, route, isAvailable, isImplemented, subAddons, type}: Partial<LocalizationAddonModel>) {
    this.label = label;
    this.route = route;
    this.isAvailable = isAvailable;
    this.isImplemented = isImplemented ?? false;
    this.subAddons = subAddons || [];
    this.type = type;
  }
  isCounter(): boolean {
    return this.type === 'counter';
  }
  isScale(): boolean {
    return this.type === 'scale';
  }
  isHighlight(): boolean {
    return this.type === 'toggle-highlight';
  }
}
