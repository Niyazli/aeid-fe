import {AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, ViewChild} from '@angular/core';
import {fromEvent, Observable} from 'rxjs';
import {debounceTime, map, startWith, switchMap} from 'rxjs/operators';
import {TranslationModel, PageModel, ProjectModel} from '../../models';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {WordInfoModal} from '../../components';
import {LocalizationService} from '../../services';

@Component({
  selector: 'lib-translations-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './translations.page.html',
  styleUrls: ['./translations.page.scss'],
})
export class TranslationsPage implements AfterViewInit {
  @ViewChild('search') search: ElementRef;
  $translationsFiltered: Observable<TranslationModel[]> = this.localizationService.$translations;
  $translations: Observable<TranslationModel[]> = this.localizationService.$translations;
  keyword: string;
  project: ProjectModel;
  constructor(
    private readonly localizationService: LocalizationService,
    private router: Router,
    private route: ActivatedRoute,
    private readonly dialog: MatDialog,
  ) {
    route.queryParamMap.subscribe((params: ParamMap) => {
      const projectId = params.get('project');
      if (projectId) {
        localizationService.getTranslationsByProject(projectId);
        localizationService.getProject(projectId).subscribe((resp: any) => {
          this.project = resp;
        });
      } else {
        localizationService.getTranslations();
      }
    });
  }
  filterTranslations = (query: string = '') =>
    this.$translations.pipe(
      map((translations: TranslationModel[]) =>
        (translations as TranslationModel[]).filter(t => t.text.toLowerCase().includes(query.trim().toLowerCase())),
      ),
    );
  ngAfterViewInit(): void {
    this.$translationsFiltered = fromEvent(this.search.nativeElement, 'input').pipe(
      startWith({target: {value: ''}}),
      map(e => ((e as InputEvent).target as any).value),
      debounceTime(100),
      switchMap(this.filterTranslations),
    );
  }

  navigateToPage(page: PageModel): void {
    this.router.navigate([{outlets: {localization: 'panel/pages'}}], {queryParams: {keyword: page.name}});
  }

  edit(translation: TranslationModel): void {
    this.dialog.open(WordInfoModal, {
      width: '500px',
      data: {id: translation.word.id, translation},
    });
  }

  reset(): void {
    this.localizationService.getTranslations();
    this.router.navigate([{outlets: {localization: 'panel/translations'}}]);
  }
}
