import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  public toggleSidenav$: Subject<'open' | 'close'> = new Subject<'open' | 'close'>();

  constructor() {}
}
