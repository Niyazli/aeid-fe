import {Injectable} from '@angular/core';
import {BackendService} from '../../../backend/services/backend.service';
import {BaseApiService} from '../../../../base/services/base-api.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VideosService extends BaseApiService {
  constructor(backendService: BackendService) {
    super(backendService, 'videos');
  }
  getAll(): Observable<any> {
    return super.getAll<any>();
  }
}
