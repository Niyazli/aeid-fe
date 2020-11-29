import {Component, OnInit} from '@angular/core';
import {LayoutService} from '../../../../layout/services/layout.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  sidebarState: 'open' | 'close';

  constructor(private layoutService: LayoutService) {}

  ngOnInit(): void {
    this.layoutService.toggleSidenav$.subscribe(state => {
      this.sidebarState = state;
    });
  }
}
