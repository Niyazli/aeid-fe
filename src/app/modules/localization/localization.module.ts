import {ModuleWithProviders, NgModule} from '@angular/core';
import {LocalizationDirective} from './directives';
import {HttpClientModule} from '@angular/common/http';
import {CommonModule} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatTabsModule} from '@angular/material/tabs';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {LocalizationRoutingModule} from './localization-routing.module';
import {MatTreeModule} from '@angular/material/tree';
import {MatListModule} from '@angular/material/list';
import {MatChipsModule} from '@angular/material/chips';
import {MatSelectModule} from '@angular/material/select';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatBadgeModule} from '@angular/material/badge';
import {OverlayModule} from '@angular/cdk/overlay';
import {WordInfoModal, LocalizationTooltipComponent, LocalizationBaseComponent, CustomLoaderComponent, AddButtonComponent} from './components';
import {
  NavigationPage,
  TranslationsPage,
  PagesPage,
  WordsPage,
  ProjectsPage,
  LocalizationWrapperPage,
  LanguagesPage,
  LanguageInfoModal,
  ProjectInfoModal,
} from './pages';
import { LanguageConfigurationModal } from './pages/languages/language-configuration/language-configuration.modal';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatCheckboxModule} from '@angular/material/checkbox';

@NgModule({
  declarations: [
    LocalizationDirective,
    LocalizationTooltipComponent,
    WordInfoModal,
    LocalizationWrapperPage,
    WordsPage,
    LocalizationBaseComponent,
    LanguagesPage,
    CustomLoaderComponent,
    AddButtonComponent,
    NavigationPage,
    LanguageInfoModal,
    TranslationsPage,
    PagesPage,
    ProjectsPage,
    ProjectInfoModal,
    LanguageConfigurationModal,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MatBottomSheetModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    LocalizationRoutingModule,
    MatTreeModule,
    MatListModule,
    MatChipsModule,
    MatSelectModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    MatBadgeModule,
    OverlayModule,
  ],
  exports: [LocalizationDirective, LocalizationTooltipComponent, LocalizationBaseComponent, AddButtonComponent],
})
export class LocalizationModule {
  static forRoot(): ModuleWithProviders<LocalizationModule> {
    return {
      ngModule: LocalizationModule,
      providers: [],
    };
  }
  static forChild(): ModuleWithProviders<LocalizationModule> {
    return {
      ngModule: LocalizationModule,
      providers: [],
    };
  }
}
