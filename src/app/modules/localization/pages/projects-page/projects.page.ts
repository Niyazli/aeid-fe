import {AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, ViewChild} from '@angular/core';
import {fromEvent, Observable} from 'rxjs';
import {debounceTime, map, startWith, switchMap} from 'rxjs/operators';
import {ProjectModel} from '../../models';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {ProjectInfoModal} from './project-info';
import {LocalizationService} from '../../services';

@Component({
  selector: 'lib-projects-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './projects.page.html',
  styleUrls: ['./projects.page.scss'],
})
export class ProjectsPage implements AfterViewInit {
  @ViewChild('search') search: ElementRef;
  $projectsFiltered: Observable<ProjectModel[]> = this.localizationService.$projects;
  $projects: Observable<ProjectModel[]> = this.localizationService.$projects;
  keyword: string;
  constructor(private readonly localizationService: LocalizationService, private router: Router, private readonly dialog: MatDialog) {
    localizationService.getProjects();
  }
  filterProjects = (query: string = '') =>
    this.$projects.pipe(
      map((projects: ProjectModel[]) => (projects as ProjectModel[]).filter(p => p.name?.toLowerCase().includes(query?.trim()?.toLowerCase()))),
    );
  ngAfterViewInit() {
    this.$projectsFiltered = fromEvent(this.search.nativeElement, 'input').pipe(
      startWith({target: {value: ''}}),
      map(e => ((e as InputEvent).target as any).value),
      debounceTime(100),
      switchMap(this.filterProjects),
    );
  }

  navigateToTranslations(project: ProjectModel) {
    this.router.navigate([{outlets: {localization: 'panel/translations'}}], {queryParams: {project: project.id}});
  }

  openProjectModal(project?: ProjectModel) {
    this.dialog.open(ProjectInfoModal, {
      width: '500px',
      data: {project},
    });
  }
}
