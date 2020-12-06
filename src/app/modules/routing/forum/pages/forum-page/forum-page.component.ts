import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ComponentWithPublicData, WithPublicDataInterface} from '../../../../base';
import {PublicFacadeService} from '../../../../services/public-facade.service';

@Component({
  selector: 'app-forum-page',
  templateUrl: './forum-page.component.html',
  styleUrls: ['./forum-page.component.scss'],
})
export class ForumPageComponent extends ComponentWithPublicData implements OnInit, WithPublicDataInterface<any[]> {
  constructor(publicFacadeService: PublicFacadeService, private router: Router, private route: ActivatedRoute) {
    super(publicFacadeService);
  }
  data: any[];
  ngOnInit(): void {
    this.getData();
  }
  getData(): void {
    this.publicFacadeService.topicsService.getAll().subscribe(response => console.log(response));
  }
  handleView(): void {
    // view/123
    this.router.navigate(['view/123'], {relativeTo: this.route, queryParams: {hasVideo: false}});
  }
}
