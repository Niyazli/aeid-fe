import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LocalizationLoginPage} from './pages/localization-login/localization-login.page';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {LocalizationAuthRoutingModule} from './localization-auth-routing.module';

@NgModule({
  declarations: [LocalizationLoginPage],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, LocalizationAuthRoutingModule, MatFormFieldModule, MatInputModule, MatButtonModule],
})
export class LocalizationAuthModule {}
