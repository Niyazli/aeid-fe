import {Injectable} from '@angular/core';
import {BaseApiService} from '../../../modules/base';
import {BackendService} from '../../../modules/services/backend/services/backend.service';
import {LoginDto, RegisterDto} from '../dtos';
import {AuthState} from '../interfaces';
import {RequestModel} from '../../../modules/services/backend/models/request.model';
import {RequestFacadeModel} from '../../../modules/services/backend/models/request-facade.model';
import {RequestType} from '../../../modules/services/backend/enum/request-type.enum';
import {Observable} from 'rxjs';
import {AuthStore} from '../store';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseApiService {
  constructor(backendService: BackendService, private authStore: AuthStore) {
    super(backendService, 'auth');
  }
  login(loginDto: LoginDto): Observable<AuthState> {
    const request: RequestModel<LoginDto> = new RequestModel<LoginDto>({
      url: this.getFullUrl('login'),
      requestBody: loginDto,
    });
    const requestFacade: RequestFacadeModel<LoginDto> = new RequestFacadeModel<LoginDto>({
      requestType: RequestType.POST,
      request,
    });
    return this.send<AuthState, LoginDto>(requestFacade).pipe(
      map(response => {
        this.authStore.login(response);
        return response;
      })
    );
  }
  register(registerDto: RegisterDto): Observable<AuthState> {
    const request: RequestModel<RegisterDto> = new RequestModel<RegisterDto>({
      url: this.getFullUrl('register'),
      requestBody: registerDto,
    });
    const requestFacade: RequestFacadeModel<RegisterDto> = new RequestFacadeModel<RegisterDto>({
      requestType: RequestType.POST,
      request,
    });
    return this.send<AuthState, RegisterDto>(requestFacade).pipe(
      map(response => {
        this.authStore.login(response);
        return response;
      })
    );
  }
}
