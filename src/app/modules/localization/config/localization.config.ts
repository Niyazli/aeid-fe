import {Environment} from '../types';
import {ID} from '@datorama/akita';

export class LocalizationConfig {
  projectId: ID;
  apiHost: string;
  environment: Environment;
}
