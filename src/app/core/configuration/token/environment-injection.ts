import {InjectionToken} from '@angular/core';
import {environment} from '../../../../environments/environment';

/**
 * ENVIRONMENT_VALUE used to get configuration string, to access specific configuration.${environment}.json file
 */
const ENVIRONMENT_VALUE = new InjectionToken<string>(String(environment.production), {
  providedIn: 'root',
  factory: () => (environment.production ? 'production' : 'development'),
});


export { ENVIRONMENT_VALUE };
