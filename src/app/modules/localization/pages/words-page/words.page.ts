import {AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, ViewChild} from '@angular/core';
import {fromEvent, Observable} from 'rxjs';
import {debounceTime, map, startWith, switchMap} from 'rxjs/operators';
import {MatTabGroup} from '@angular/material/tabs';
import {WordInfoModal} from '../../components';
import {MatDialog} from '@angular/material/dialog';
import {NotTranslatedWordModel, WordModel} from '../../models';
import {LocalizationService} from '../../services';
import {WordTabs} from '../../enums';

@Component({
  selector: 'lib-words-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './words.page.html',
  styleUrls: ['./words.page.scss'],
})
export class WordsPage implements AfterViewInit {
  @ViewChild('search') search: ElementRef;
  @ViewChild('tabGroup') tabGroup: MatTabGroup;
  $wordsFiltered: Observable<WordModel[] | NotTranslatedWordModel[]> = this.localizationService.$words;
  $words: Observable<WordModel[]> = this.localizationService.$words;
  $notCreated: Observable<NotTranslatedWordModel[]> = this.localizationService.$notTranslatedWords;
  keyword: string;
  constructor(private readonly localizationService: LocalizationService, private readonly dialog: MatDialog) {
    localizationService.getInitialData();
  }
  filterWords = (query: string = '') =>
    this.getObservableForFiltering().pipe(
      map((words: WordModel[] | NotTranslatedWordModel[]) =>
        (words as WordModel[]).filter(w => w.keyword?.toLowerCase().includes(query?.trim()?.toLowerCase())),
      ),
    );
  getObservableForFiltering = (): Observable<WordModel[] | NotTranslatedWordModel[]> =>
    this.tabGroup.selectedIndex === WordTabs.Created ? this.$words : this.$notCreated;
  ngAfterViewInit(): void {
    this.$wordsFiltered = fromEvent(this.search.nativeElement, 'input').pipe(
      startWith({target: {value: ''}}),
      map(e => ((e as InputEvent).target as any).value),
      debounceTime(100),
      switchMap(this.filterWords),
    );
  }

  createSimple(word: WordModel): void {
    this.localizationService.createWord(word.keyword);
  }

  edit(word: WordModel): void {
    this.dialog.open(WordInfoModal, {
      width: '500px',
      data: {id: word.id},
    });
  }
}
