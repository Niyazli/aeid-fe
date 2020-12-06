import {ID} from '@datorama/akita';

interface BaseEntity {
  id?: ID;
  createdAt?: number;
  updatedAt?: number;
}

export { BaseEntity };
