import {Injectable, Injector} from '@angular/core';
import {TopicsService} from './api/topics/services';
import {VideosService} from './api/videos/services';

@Injectable({
  providedIn: 'root',
})
export class PublicFacadeService {
  constructor(private injector: Injector) {}
  private _topicsService: TopicsService;
  public get topicsService(): TopicsService {
    if (!this._topicsService) {
      this._topicsService = this.injector.get(TopicsService);
    }
    return this._topicsService;
  }
  private _videosService: VideosService;
  public get videosService(): VideosService {
    if (!this._videosService) {
      this._videosService = this.injector.get(VideosService);
    }
    return this._videosService;
  }
}
