import {AuthState} from '../interfaces';

class LoginDto implements Pick<AuthState, 'username'>{
  username: string;
  password: string;
}

export { LoginDto };
