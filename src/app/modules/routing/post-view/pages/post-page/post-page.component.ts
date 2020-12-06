import {Component, OnDestroy, OnInit} from '@angular/core';
import {LayoutService} from '../../../../layout/services/layout.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss'],
})
export class PostPageComponent implements OnInit, OnDestroy {
  constructor(private layoutService: LayoutService, private location: Location) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.layoutService.toggleSidenav$.next('open');
      this.layoutService.filterBarState$.next('hide');
    }, 0);
  }

  ngOnDestroy(): void {
    this.layoutService.toggleSidenav$.next('close');
    this.layoutService.filterBarState$.next('show');
  }

  back(): void {
    this.location.back();
  }
}
