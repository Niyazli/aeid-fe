import {Module} from './module.interface';

interface ModulesConfiguration {
  customer: string;
  modules: Module[];
  specific_functionality: string[];
  inaccessible_functionality: string[];
}


export { ModulesConfiguration };
