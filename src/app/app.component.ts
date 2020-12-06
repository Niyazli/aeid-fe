import {Component} from '@angular/core';
import {AuthService} from './core/auth/services/auth.service';
import {LocalizationBaseComponent, LocalizationService} from './modules/localization';

@Component({
  selector: 'app-root',
  template: `
    <mat-drawer-container class="drawer-container" [hasBackdrop]="true">
      <mat-drawer #drawer [style.width]="($extensionScale | async)?.width" mode="side">
        <router-outlet name="localization"></router-outlet>
      </mat-drawer>
      <mat-drawer-content #drawerContent>
        <router-outlet></router-outlet>
      </mat-drawer-content>
    </mat-drawer-container>
  `,
})
export class AppComponent extends LocalizationBaseComponent {
  title = 'aeif';
  constructor(localizationService: LocalizationService, private authService: AuthService) {
    super(localizationService);
    this.authService.login({username: 'admin', password: 'admin'}).subscribe(response => console.log(response));
  }
}
