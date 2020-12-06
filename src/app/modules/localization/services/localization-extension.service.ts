import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {ExtensionScaleModel} from '../models';
import {Environment} from '../types';
import {ConfigService} from '../../../core/configuration';
@Injectable({
  providedIn: 'root',
})
export class LocalizationExtensionService {
  private readonly environment: Environment;
  $extensionScale: BehaviorSubject<ExtensionScaleModel> = new BehaviorSubject<ExtensionScaleModel>({width: '480px'});
  $highlightToggled: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor(
    private readonly config: ConfigService
  ) {
    this.environment = 'dev';
  }
  extensionIsAvailable(): boolean {
    const applicableEnvs: Environment[] = ['dev', 'test', 'pre-launch'];
    return applicableEnvs.includes(this.environment);
  }
}
