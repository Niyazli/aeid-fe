import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'ui-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss'],
})
export class LogoComponent implements OnInit {
  @Input() color = '#fff';
  constructor() {}

  ngOnInit(): void {}
}
