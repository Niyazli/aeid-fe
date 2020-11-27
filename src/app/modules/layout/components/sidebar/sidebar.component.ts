import {Component, OnInit} from '@angular/core';
import {IMenuItem} from '../../models/interfaces/menu-item.interface';
import {MENU_ITEMS} from '../../models/const/menu-item.const';

@Component({
  selector: 'ui-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  public menuItems: IMenuItem[] = MENU_ITEMS;
  constructor() {}

  ngOnInit(): void {}
}
