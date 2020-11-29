import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';
import {LayoutService} from '../../services/layout.service';

@Component({
  selector: 'ui-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  @ViewChild('sidenav') public sidenav: MatSidenav;

  constructor(private layoutService: LayoutService) {}

  ngOnInit(): void {
    this.layoutService.toggleSidenav$.subscribe(method => {
      this.sidenav[method]();
    });
  }

  toggle(): void {
    this.sidenav.toggle();
  }
}
