import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  public toggleSidenav$: Subject<'open' | 'close'> = new Subject<'open' | 'close'>();
  public filterBarState$: BehaviorSubject<'show' | 'hide'> = new BehaviorSubject<'show' | 'hide'>('show');

  constructor() {}
}
