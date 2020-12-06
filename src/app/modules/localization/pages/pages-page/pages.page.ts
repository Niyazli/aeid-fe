import {AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, ViewChild} from '@angular/core';
import {fromEvent, Observable} from 'rxjs';
import {debounceTime, map, startWith, switchMap} from 'rxjs/operators';
import {PageModel} from '../../models';
import {Router} from '@angular/router';
import {LocalizationService} from '../../services';

@Component({
  selector: 'lib-pages-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './pages.page.html',
  styleUrls: ['./pages.page.scss'],
})
export class PagesPage implements AfterViewInit {
  @ViewChild('search') search: ElementRef;
  $pagesFiltered: Observable<PageModel[]> = this.localizationService.$pages;
  $pages: Observable<PageModel[]> = this.localizationService.$pages;
  keyword: string;
  constructor(private readonly localizationService: LocalizationService, private router: Router) {
    localizationService.getPages();
  }
  filterPages = (query: string = '') =>
    this.$pages.pipe(map((pages: PageModel[]) => (pages as PageModel[]).filter(p => p.name?.toLowerCase().includes(query?.trim()?.toLowerCase()))));
  ngAfterViewInit() {
    this.$pagesFiltered = fromEvent(this.search.nativeElement, 'input').pipe(
      startWith({target: {value: ''}}),
      map(e => ((e as InputEvent).target as any).value),
      debounceTime(100),
      switchMap(this.filterPages),
    );
  }

  navigateToTranslations(page: PageModel) {
    this.router.navigate([{outlets: {localization: 'panel/translations'}}], {queryParams: {page: page.id}});
  }
}
