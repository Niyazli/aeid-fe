import {Component, OnDestroy, OnInit} from '@angular/core';
import {LayoutService} from '../../../../layout/services/layout.service';

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.scss'],
})
export class AboutPageComponent implements OnInit, OnDestroy {
  constructor(private layoutService: LayoutService) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.layoutService.filterBarState$.next('hide');
    }, 0);
  }

  ngOnDestroy(): void {
    this.layoutService.filterBarState$.next('show');
  }
}
