import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {LocalizationConfig} from '../config';
import {LocalizationUserModel, HttpResponseModel} from '../models';
import {LoginCredentialsDto} from '../dtos';
import {ConfigService} from '../../../core/configuration';

@Injectable({
  providedIn: 'root',
})
export class LocalizationAuthService {
  private readonly config: LocalizationConfig;
  $user: BehaviorSubject<LocalizationUserModel | null> = new BehaviorSubject<LocalizationUserModel | null>(null);
  $token: Observable<string | null> = this.$user.pipe(map(user => user?.token ?? null));
  $isLoggedIn: Observable<boolean> = this.$user.pipe(map(user => !!user?.token));
  constructor(private readonly http: HttpClient, private readonly router: Router, private readonly configService: ConfigService) {
    this.config = {apiHost: configService.config.localization, projectId: configService.config.project, environment: 'dev'};
  }
  login(loginCredentialsDto: LoginCredentialsDto): Subscription {
    return this.proceedFulLRequest<LocalizationUserModel>(
      this.http.post<HttpResponseModel<LocalizationUserModel>>(`${this.config.apiHost}/auth/login`, loginCredentialsDto),
    ).subscribe(response => {
      this.$user.next(response);
      this.router.navigate([{outlets: {localization: 'panel'}}]);
    });
  }
  private proceedFulLRequest<T>(request: Observable<HttpResponseModel<T>>): Observable<T> {
    return request.pipe(map(response => response.data));
  }
}
