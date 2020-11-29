import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-podcast-box',
  templateUrl: './podcast-box.component.html',
  styleUrls: ['./podcast-box.component.scss'],
})
export class PodcastBoxComponent implements OnInit {
  isPlay = false;

  constructor() {}

  ngOnInit(): void {}
}
