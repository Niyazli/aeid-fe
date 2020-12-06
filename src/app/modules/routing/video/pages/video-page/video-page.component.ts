import {Component, OnInit} from '@angular/core';
import {LayoutComponent} from '../../../../layout/components/layout/layout.component';
import {ActivatedRoute, Router} from '@angular/router';
import {ComponentWithPublicData, WithPublicDataInterface} from '../../../../base';
import {PublicFacadeService} from '../../../../services/public-facade.service';

@Component({
  selector: 'app-video-page',
  templateUrl: './video-page.component.html',
  styleUrls: ['./video-page.component.scss'],
  providers: [LayoutComponent],
})
export class VideoPageComponent extends ComponentWithPublicData implements OnInit, WithPublicDataInterface<any> {
  constructor(
    publicFacadeService: PublicFacadeService,
    private router: Router, private route: ActivatedRoute) {
    super(publicFacadeService);
  }
  data: any;
  ngOnInit(): void {
    this.getData();
  }
  getData(): void {
    this.publicFacadeService.videosService.getAll().subscribe(response => console.log(response));
  }
  handleView(): void {
    // view/123
    this.router.navigate(['view/123'], {relativeTo: this.route, queryParams: {hasVideo: true}});
  }
}
