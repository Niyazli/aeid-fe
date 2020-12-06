import {Injectable} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PageModel} from '../models/page.model';

@Injectable({
  providedIn: 'root',
})
export class PageService {
  constructor(private readonly route: ActivatedRoute, private readonly router: Router) {}
  getPage(): PageModel {
    return this.route.routeConfig ? this.validatePage() : new PageModel({name: 'global', path: '/'} as PageModel);
  }
  navigateToLocalization(): void {
    this.router.navigate([{outlets: {localization: 'panel'}}]);
  }
  closeLocalization(): void {
    // this.router.navigate(['/event/list'])
  }
  private validatePage(): PageModel {
    return {
      name: this.route?.routeConfig?.component?.name,
      path: this.route?.routeConfig?.path === '' ? '/' : this.route?.routeConfig?.path,
    } as PageModel;
  }
}
