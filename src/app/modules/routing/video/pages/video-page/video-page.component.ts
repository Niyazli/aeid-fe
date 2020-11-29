import {Component, OnInit} from '@angular/core';
import {LayoutComponent} from '../../../../layout/components/layout/layout.component';
import {LayoutService} from '../../../../layout/services/layout.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-video-page',
  templateUrl: './video-page.component.html',
  styleUrls: ['./video-page.component.scss'],
  providers: [LayoutComponent],
})
export class VideoPageComponent implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {}

  handleView(): void {
    // view/123
    this.router.navigate(['view/123'], {relativeTo: this.route});
  }
}
