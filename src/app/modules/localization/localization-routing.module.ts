import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NavigationPage, TranslationsPage, PagesPage, WordsPage, ProjectsPage, LocalizationWrapperPage, LanguagesPage} from './pages';
import {loadLocalizationAuth} from './lazy-loaders';

const routes: Routes = [
  {
    path: 'panel',
    outlet: 'localization',
    component: LocalizationWrapperPage,
    children: [
      {
        path: '',
        component: NavigationPage,
      },
      {
        path: 'auth',
        loadChildren: loadLocalizationAuth,
      },
      {
        path: 'languages',
        component: LanguagesPage,
      },
      {
        path: 'words',
        component: WordsPage,
      },
      {path: 'translations', component: TranslationsPage},
      {path: 'pages', component: PagesPage},
      {path: 'projects', component: ProjectsPage},
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LocalizationRoutingModule {}
