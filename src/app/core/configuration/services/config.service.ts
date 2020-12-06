import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {ModulesConfiguration} from '../interfaces';
import {ENVIRONMENT_VALUE} from '../token';
import {ID} from '@datorama/akita';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  public modulesConfiguration: BehaviorSubject<ModulesConfiguration | null> = new BehaviorSubject<ModulesConfiguration | null>(null);
  public configSubject$: BehaviorSubject<{
    production: boolean;
    api: string;
    localization: string;
    project: ID;
  } | null> = new BehaviorSubject<{
    production: boolean;
    api: string;
    localization: string;
    project: ID;
  } | null>(null);
  public config: {
    production: boolean;
    api: string;
    localization: string;
    project: ID;
  };
  constructor(@Inject(ENVIRONMENT_VALUE) private environment: string, private httpClient: HttpClient) {}
  public loadConfig(): Promise<void> {
    // this.loadModulesConfiguration();
    return this.httpClient
      .get(`/assets/config/config.${this.environment}.json`)
      .toPromise()
      .then((config: any) => {
        this.config = config;
        this.configSubject$.next(this.config);
      })
      .catch((err: any) => {
        console.error(err);
      });
  }
  public loadModulesConfiguration(): Promise<void> {
    return this.httpClient
      .get<ModulesConfiguration>(`/assets/config/modules.${this.environment}.json`)
      .toPromise()
      .then((config: ModulesConfiguration) => {
        this.modulesConfiguration.next(config);
        console.log(config);
      })
      .catch((err: any) => {
        console.error(err);
      });
  }
}
