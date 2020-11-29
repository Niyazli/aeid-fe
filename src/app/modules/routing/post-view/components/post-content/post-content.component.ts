import {Component, OnInit} from '@angular/core';
import {PostQueryModel} from '../../models/post-query.model';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-post-content',
  templateUrl: './post-content.component.html',
  styleUrls: ['./post-content.component.scss'],
})
export class PostContentComponent implements OnInit {
  public postQueryParams: PostQueryModel = new PostQueryModel();

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      if (params) {
        this.postQueryParams.hasVideo = params.hasVideo === 'true';
      }
    });
  }
}
