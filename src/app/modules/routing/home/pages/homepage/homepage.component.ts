import {Component, OnInit} from '@angular/core';
import {LayoutService} from '../../../../layout/services/layout.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  filterBarState: 'show' | 'hide';

  constructor(private layoutService: LayoutService) {}

  ngOnInit(): void {
    this.layoutService.filterBarState$.subscribe(state => (this.filterBarState = state));
  }
}
