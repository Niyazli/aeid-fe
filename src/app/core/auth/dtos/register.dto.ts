import {LoginDto} from './login.dto';
import {AuthState} from '../interfaces';

class RegisterDto extends LoginDto implements Pick<AuthState, 'firstName' | 'lastName'>{
  confirmPassword: string;
  firstName: string;
  lastName: string;
}

export { RegisterDto };
