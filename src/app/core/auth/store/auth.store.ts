import {Injectable} from '@angular/core';
import {Store, StoreConfig} from '@datorama/akita';
import {AuthState} from '../interfaces';

export function createInitialState(): AuthState {
  return {
    id: undefined,
    createdAt: undefined,
    firstName: undefined,
    username: undefined,
    lastName: undefined,
    roles: [],
    token: undefined,
    updatedAt: undefined,
  };
}

@Injectable({providedIn: 'root'})
@StoreConfig({name: 'Auth'})
export class AuthStore extends Store<AuthState> {
  constructor() {
    super(createInitialState());
  }
  login(authState: AuthState): void {
    this.update({...authState});
  }
}
