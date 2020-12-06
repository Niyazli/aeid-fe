import {Injectable} from '@angular/core';
import {BaseApiService} from '../../../../base/services/base-api.service';
import {BackendService} from '../../../backend/services/backend.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TopicsService extends BaseApiService {
  constructor(backendService: BackendService) {
    super(backendService, 'topics');
  }
  getAll(): Observable<any> {
    return super.getAll<any>();
  }
}
