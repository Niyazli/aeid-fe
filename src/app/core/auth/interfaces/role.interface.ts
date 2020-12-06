import {BaseEntity} from '../../../modules/base';
import {RoleE} from '../enums';

interface Role extends BaseEntity {
  name: RoleE;
  description: string;
  enabled: boolean;
}



export { Role };
