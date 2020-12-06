import {Component} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {LocalizationAuthService} from '../../../../services';

@Component({
  selector: 'lib-localization-login',
  template: `
    <form class="login-form" [formGroup]="loginCredentials" (ngSubmit)="handleSubmit()">
      <mat-form-field>
        <mat-label>Email</mat-label>
        <input matInput type="text" formControlName="username" />
      </mat-form-field>
      <mat-form-field>
        <mat-label>Password</mat-label>
        <input matInput type="password" formControlName="password" />
      </mat-form-field>
      <button mat-raised-button color="primary" [disabled]="!loginCredentials.valid">Login</button>
    </form>
  `,
  styleUrls: ['./localization-login.page.scss'],
})
export class LocalizationLoginPage {
  loginCredentials = this.builder.group({
    // TODO: REMOVE THIS
    username: ['admin', [Validators.required]],
    password: ['admin', Validators.required],
  });
  constructor(private readonly localizationAuthService: LocalizationAuthService, private readonly builder: FormBuilder) {}
  handleSubmit(): void {
    this.localizationAuthService.login(this.loginCredentials.getRawValue());
  }
}
