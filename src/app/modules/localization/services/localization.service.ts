import {Injectable} from '@angular/core';
import {LocalizationConfig} from '../config/localization.config';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, combineLatest, noop, Observable, Subject} from 'rxjs';
import {LanguageModel} from '../models/language.model';
import {HttpResponseModel} from '../models/http-response.model';
import {map, tap} from 'rxjs/operators';
import {WordModel} from '../models/word.model';
import {CreateWordDto} from '../dtos/create-word.dto';
import {PageService} from './page.service';
import {LanguageActionDto} from '../dtos/language-action.dto';
import {TranslationModel} from '../models/translation.model';
import {PageModel} from '../models/page.model';
import {ProjectModel} from '../models/project.model';
import {ProjectActionDto} from '../dtos/project-action.dto';
import {NotTranslatedWordModel} from '../models/not-translated-word.model';
import {LocalizationAuthService} from './localization-auth.service';
import {ExtensionScaleModel} from '../models/extension-scale.model';
import {LocalizationAddonsService} from './localization-addons.service';
import {LocalizationExtensionService} from './localization-extension.service';
import {CreateTranslationDto} from '../dtos/create-translation.dto';
import {UpdateSeveralTranslationsDto} from '../dtos/update-several-translations.dto';
import {LocalizationUserModel} from '../models/localization-user.model';
import {UpdateTranslationDto} from '../dtos/update-translation.dto';
import {ID} from '@datorama/akita';
import {ConfigService} from '../../../core/configuration';
import {AddLanguageConfigurationDto} from '../dtos';
import {LanguageConfigurationModel} from '../models';

@Injectable({
  providedIn: 'root',
})
export class LocalizationService {
  private readonly config: LocalizationConfig;
  public $user: BehaviorSubject<LocalizationUserModel | null> = this.localizationAuthService.$user;
  public $allLanguages: BehaviorSubject<LanguageModel[]> = new BehaviorSubject<LanguageModel[]>([]);
  public $languages: BehaviorSubject<LanguageModel[]> = new BehaviorSubject<LanguageModel[]>([]);
  public $activeLanguages: Observable<LanguageModel[]> = this.$languages.pipe(
    map((languages: LanguageModel[]) => languages.filter(lang => lang.languageConfigurations?.some(lc => lc.isActive)))
  );
  public $languagesCount: Observable<number> = combineLatest([this.$languages]).pipe(
    map(([$languages]) => {
      return $languages.length;
    })
  );
  public $languages_alpha2: Observable<string[]> = this.$languages.pipe(map(langs => langs.map(l => l.alpha2)));
  // @ts-ignore
  public $activeLanguage: BehaviorSubject<LanguageModel> = new BehaviorSubject<LanguageModel>(null);
  public $activeLanguage_ID: Observable<ID | undefined> = this.$activeLanguage.pipe(map(lang => lang.id));
  public $activeLanguage_alpha2: Observable<string> = this.$activeLanguage.pipe(map(lang => lang?.alpha2));
  public $words: BehaviorSubject<WordModel[]> = new BehaviorSubject<WordModel[]>([]);
  public $notTranslatedWords: BehaviorSubject<NotTranslatedWordModel[]> = new BehaviorSubject<NotTranslatedWordModel[]>([]);
  public $wordsCount: Observable<number> = combineLatest([this.$words, this.$notTranslatedWords]).pipe(
    map(([$words, $notTranslatedWords]) => {
      return $words.length + $notTranslatedWords.length;
    })
  );
  public $wordsTranslated: Observable<number> = this.$words.pipe(map(words => words?.length || 0));
  public $wordAdded: Subject<WordModel> = new Subject<WordModel>();
  public $wordChanged: Subject<WordModel> = new Subject<WordModel>();
  public $extensionScale: Observable<ExtensionScaleModel> = this.localizationExtensionService.$extensionScale;
  public $highlightToggled: Observable<boolean> = this.localizationExtensionService.$highlightToggled;
  public $isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public $translations: BehaviorSubject<TranslationModel[]> = new BehaviorSubject<TranslationModel[]>([]);
  public $translationsCount: Observable<number> = combineLatest([this.$translations]).pipe(
    map(([$translations]) => {
      return $translations.length;
    })
  );
  public $pages: BehaviorSubject<PageModel[]> = new BehaviorSubject<PageModel[]>([]);
  public $projects: BehaviorSubject<ProjectModel[]> = new BehaviorSubject<ProjectModel[]>([]);
  constructor(
    private readonly http: HttpClient,
    private readonly pageService: PageService,
    private readonly addonsService: LocalizationAddonsService,
    private readonly localizationAuthService: LocalizationAuthService,
    private readonly localizationExtensionService: LocalizationExtensionService,
    private readonly configService: ConfigService
  ) {
    this.config = {apiHost: configService.config.localization, projectId: configService.config.project, environment: 'dev'};
  }
  getInitialData(): void {
    this.getLanguages();
    this.getWords();
  }

  initialContentLoaded(): boolean {
    return !!this.$words.getValue() && this.$words.getValue().length > 0 && !!this.$languages.getValue();
  }
  openLocalization(): void {
    this.pageService.navigateToLocalization();
  }
  closeLocalization(): void {
    this.pageService.closeLocalization();
  }
  extensionIsAvailable(): boolean {
    return this.localizationExtensionService.extensionIsAvailable();
  }
  setActiveLanguage(language: LanguageModel): void {
    localStorage.setItem('activeLanguage', JSON.stringify(language));
    this.$activeLanguage.next(language);
  }
  getWord({keyword}: Partial<WordModel>): WordModel {
    return this.$words.getValue().find(w => w.keyword?.toLowerCase() === keyword?.toLowerCase()) as WordModel;
  }
  getInnerText({keyword}: Required<Pick<WordModel, 'keyword'>>): string {
    const word: WordModel | undefined = this.$words.getValue().find(w => w.keyword?.toLowerCase() === keyword?.toLowerCase());
    if (word) {
      const translation: TranslationModel | undefined = word.translations.find(t => t.language.id === this.$activeLanguage.getValue().id);
      return translation?.text ?? keyword;
    }
    return keyword;
  }
  getWordAdvanced({id}: Partial<WordModel>): Observable<WordModel> {
    return this.proceedFulLRequest<WordModel>(this.http.get<HttpResponseModel<WordModel>>(`${this.config.apiHost}/words/${id}`));
  }
  createWord(keyword: string): void {
    const createWordDto: CreateWordDto = new CreateWordDto({keyword, page: this.pageService.getPage()});
    this.createWordSimple(createWordDto);
  }
  createWordSimple({keyword, page}: Partial<CreateWordDto>): void {
    const headers = this.buildHeaders();
    this.$isLoading.next(true);
    this.proceedFulLRequest<WordModel>(
      this.http.post<HttpResponseModel<WordModel>>(
        `${this.config.apiHost}/words`,
        {
          keyword,
          page,
        },
        {headers}
      )
    )
      .pipe(
        tap(
          () => noop(),
          () => this.$isLoading.next(false),
          () => this.$isLoading.next(false)
        )
      )
      .subscribe(word => {
        this.$words.next([...this.$words.getValue(), word]);
        const notTranslatedWord = this.$notTranslatedWords.getValue().filter(w => w.keyword !== keyword);
        this.$notTranslatedWords.next(notTranslatedWord);
        this.$wordAdded.next(word);
      });
  }
  addWordAsNoTranslated(word: Partial<NotTranslatedWordModel>): void {
    if (!word.page) {
      word.page = this.pageService.getPage();
    }
    this.$notTranslatedWords.next([...this.$notTranslatedWords.getValue(), word as NotTranslatedWordModel]);
  }
  addTranslation({wordId, languageId, text}: Required<Partial<CreateTranslationDto>>): void {
    const headers = this.buildHeaders();
    const createTranslationDto: CreateTranslationDto = new CreateTranslationDto({wordId, languageId, text, page: this.pageService.getPage()});
    this.$isLoading.next(true);
    this.proceedFulLRequest<TranslationModel>(
      this.http.post<HttpResponseModel<TranslationModel>>(
        `${this.config.apiHost}/words/${createTranslationDto.wordId}/translations/add`,
        createTranslationDto,
        {headers}
      )
    )
      .pipe(
        tap(
          () => noop(),
          () => this.$isLoading.next(false),
          () => this.$isLoading.next(false)
        )
      )
      .subscribe(response => {
        const words = this.$words.getValue();
        const wordIndex = words.findIndex(w => w.id === wordId);
        words[wordIndex].translations.push(response);
        this.$words.next(words);
        this.$wordChanged.next(words[wordIndex]);
      });
  }
  updateTranslation(updateTranslationDto: UpdateTranslationDto): void {
    const headers = this.buildHeaders();
    this.$isLoading.next(true);
    this.proceedFulLRequest<TranslationModel>(
      this.http.put<HttpResponseModel<TranslationModel>>(
        `${this.config.apiHost}/words/${updateTranslationDto.wordId}/translations/${updateTranslationDto.translationId}/edit`,
        {
          text: updateTranslationDto.text,
        },
        {headers}
      )
    )
      .pipe(
        tap(
          () => noop(),
          () => this.$isLoading.next(false),
          () => this.$isLoading.next(false)
        )
      )
      .subscribe(res => {
        const words = this.$words.getValue();
        const wordIndex = words.findIndex(w => w.id === updateTranslationDto.wordId);
        const translationIndex = words[wordIndex].translations.findIndex(t => t.id === updateTranslationDto.translationId);
        words[wordIndex].translations[translationIndex].text = res.text;
        words[wordIndex].translations[translationIndex].updatedAt = res.updatedAt;
        this.$words.next(words);
        this.$wordChanged.next(words[wordIndex]);
      });
  }
  updateTranslations(updateTranslationDto: UpdateSeveralTranslationsDto): void {
    const headers = this.buildHeaders();
    this.$isLoading.next(true);
    this.proceedFulLRequest<TranslationModel[]>(
      this.http.put<HttpResponseModel<TranslationModel[]>>(
        `${this.config.apiHost}/words/${updateTranslationDto.wordId}/translations/edit`,
        {
          translations: updateTranslationDto.translations,
        },
        {headers}
      )
    )
      .pipe(
        tap(
          () => noop(),
          () => this.$isLoading.next(false),
          () => this.$isLoading.next(false)
        )
      )
      .subscribe(response => {
        const words = this.$words.getValue();
        const wordIndex = words.findIndex(w => w.id === updateTranslationDto.wordId);
        words[wordIndex].translations = words[wordIndex].translations.map(t => {
          return {...t, text: response.find(translation => translation.id === t.id)?.text};
        }) as any;
        this.$words.next(words);
        this.$wordChanged.next(words[wordIndex]);
      });
  }
  private getLanguages(): void {
    const activeLanguage = localStorage.getItem('activeLanguage');
    const selectedLang = null;
    this.proceedFulLRequest<LanguageModel[]>(this.http.get<HttpResponseModel<LanguageModel[]>>(`${this.config.apiHost}/languages`)).subscribe(
      languages => {
        this.$allLanguages.next(languages);
        const availableLanguages: LanguageModel[] = languages.filter(lang => lang.languageConfigurations?.some(lc => lc.isActive));
        this.$languages.next(availableLanguages);
        if (selectedLang) {
          this.setActiveLanguage(selectedLang as any);
        } else {
          this.setActiveLanguage(languages.find(l => l.languageConfigurations.some(lc => lc.isDefault)) as LanguageModel);
        }
      }
    );
    // }
  }
  createLanguage(name: string, alpha2: string): void {
    const headers = this.buildHeaders();
    const createLanguageDto: LanguageActionDto = new LanguageActionDto({name, alpha2});
    this.$isLoading.next(true);
    this.proceedFulLRequest<LanguageModel>(
      this.http.post<HttpResponseModel<LanguageModel>>(`${this.config.apiHost}/languages`, createLanguageDto, {headers})
    )
      .pipe(
        tap(
          () => noop(),
          () => this.$isLoading.next(false),
          () => this.$isLoading.next(false)
        )
      )
      .subscribe(language => {
        this.$languages.next([...this.$languages.getValue(), language]);
      });
  }
  addLanguageConfiguration(addLanguageConfigurationDto: AddLanguageConfigurationDto): void {
    const headers = this.buildHeaders();
    this.proceedFulLRequest<LanguageConfigurationModel>(
      this.http.patch<HttpResponseModel<LanguageConfigurationModel>>(
        `${this.config.apiHost}/languages/${addLanguageConfigurationDto.languageId}/addConfiguration`,
        {...addLanguageConfigurationDto, projectId: this.config.projectId},
        {headers}
      )
    ).subscribe(response => {
      const languages: LanguageModel[] = this.$languages.getValue();
      const language: number = languages.findIndex(l => l.id === addLanguageConfigurationDto.languageId);
      languages[language].languageConfigurations.push(response);
      this.$languages.next(languages);
    });
  }
  updateLanguge(language: LanguageModel): void {
    const headers = this.buildHeaders();
    const updateLangugeDto: LanguageActionDto = new LanguageActionDto({name: language.name, alpha2: language.alpha2});
    this.$isLoading.next(true);
    this.proceedFulLRequest<LanguageModel>(
      this.http.put<HttpResponseModel<LanguageModel>>(`${this.config.apiHost}/languages/${language.id}`, updateLangugeDto, {headers})
    )
      .pipe(
        tap(
          () => noop(),
          () => this.$isLoading.next(false),
          () => this.$isLoading.next(false)
        )
      )
      .subscribe(resp => {
        const languages = this.$languages.getValue();
        const index = languages.indexOf(languages.find((l: LanguageModel) => l.id === language.id) as LanguageModel);
        languages[index] = language;
        this.$languages.next([...languages]);
      });
  }
  getTranslations(): void {
    this.proceedFulLRequest<TranslationModel[]>(
      this.http.get<HttpResponseModel<TranslationModel[]>>(`${this.config.apiHost}/translations`)
    ).subscribe(translations => this.$translations.next(translations));
  }

  getTranslationsByProject(projectId: string): void {
    this.proceedFulLRequest<TranslationModel[]>(
      this.http.get<HttpResponseModel<TranslationModel[]>>(`${this.config.apiHost}/translations/findByProject?projectId=${projectId}`)
    ).subscribe(translations => this.$translations.next(translations));
  }

  getPages(): void {
    this.proceedFulLRequest<PageModel[]>(this.http.get<HttpResponseModel<PageModel[]>>(`${this.config.apiHost}/pages`)).subscribe(pages =>
      this.$pages.next(pages)
    );
  }

  getProjects(): void {
    this.proceedFulLRequest<ProjectModel[]>(this.http.get<HttpResponseModel<ProjectModel[]>>(`${this.config.apiHost}/projects`)).subscribe(projects =>
      this.$projects.next(projects)
    );
  }

  getProject(projectId: string): Observable<ProjectModel[]> {
    return this.proceedFulLRequest<ProjectModel[]>(this.http.get<HttpResponseModel<ProjectModel[]>>(`${this.config.apiHost}/projects/${projectId}`));
  }

  createProject(name: string, origin: string): void {
    const headers = this.buildHeaders();
    const createProjectDTO: ProjectActionDto = new ProjectActionDto({name, origin});
    this.$isLoading.next(true);
    this.proceedFulLRequest<ProjectModel>(
      this.http.post<HttpResponseModel<ProjectModel>>(`${this.config.apiHost}/projects`, createProjectDTO, {headers})
    )
      .pipe(
        tap(
          () => noop(),
          () => this.$isLoading.next(false),
          () => this.$isLoading.next(false)
        )
      )
      .subscribe(project => {
        this.$projects.next([...this.$projects.getValue(), project]);
      });
  }

  updateProject(project: ProjectModel): void {
    const headers = this.buildHeaders();
    const updateProjectDto: ProjectActionDto = new ProjectActionDto({name: project.name, origin: project.origin});
    this.$isLoading.next(true);
    this.proceedFulLRequest<LanguageModel>(
      this.http.put<HttpResponseModel<LanguageModel>>(`${this.config.apiHost}/languages/${project.id}`, updateProjectDto, {headers})
    )
      .pipe(
        tap(
          () => noop(),
          () => this.$isLoading.next(false),
          () => this.$isLoading.next(false)
        )
      )
      .subscribe(resp => {
        const projects = this.$projects.getValue();
        const index = projects.indexOf(projects.find((p: ProjectModel) => p.id === project.id) as ProjectModel);
        projects[index] = project;
        this.$projects.next([...projects]);
      });
  }
  private buildHeaders(): HttpHeaders {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Authorization', ('Bearer ' + this.localizationAuthService.$user.getValue()?.token) as string);
    return headers;
  }
  private getWords(): void {
    this.proceedFulLRequest<WordModel[]>(this.http.get<HttpResponseModel<WordModel[]>>(`${this.config.apiHost}/words`)).subscribe(words =>
      this.$words.next(words)
    );
  }
  private proceedFulLRequest<T>(request: Observable<HttpResponseModel<T>>): Observable<T> {
    return request.pipe(map(response => response.data));
  }
}
