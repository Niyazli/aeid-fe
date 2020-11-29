import {Component, OnInit} from '@angular/core';
import {LayoutService} from '../../../../layout/services/layout.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss'],
})
export class PostPageComponent implements OnInit {
  constructor(private layoutService: LayoutService, private location: Location) {}

  ngOnInit(): void {
    setTimeout(() => this.layoutService.toggleSidenav$.next('open'), 0);
  }

  back(): void {
    this.layoutService.toggleSidenav$.next('close');
    this.location.back();
  }
}
