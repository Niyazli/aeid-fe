import {BaseEntity} from '../../../modules/base';
import {Role} from './role.interface';

interface AuthState extends BaseEntity {
  username?: string;
  firstName?: string;
  lastName?: string;
  roles: Role[];
  token?: string;
}

export { AuthState };
