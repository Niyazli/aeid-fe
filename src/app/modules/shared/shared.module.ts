import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LogoComponent} from './components/logo/logo.component';
import {PageFilteringComponent} from './components/page-filtering/page-filtering.component';
import {MaterialModule} from '../material/material.module';
import {LocalizationModule} from '../localization';

@NgModule({
  declarations: [LogoComponent, PageFilteringComponent],
  exports: [LogoComponent, PageFilteringComponent],
  imports: [CommonModule, MaterialModule, LocalizationModule],
})
export class SharedModule {}
