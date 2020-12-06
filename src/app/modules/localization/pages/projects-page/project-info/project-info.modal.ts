import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {LocalizationService} from '../../../services/localization.service';
import {ProjectModel} from '../../../models/project.model';

@Component({
  templateUrl: './project-info.modal.html',
  styleUrls: ['./project-info.modal.scss'],
})
export class ProjectInfoModal implements OnInit {
  project: ProjectModel = new ProjectModel();
  constructor(
    private readonly localizationService: LocalizationService,
    public dialog: MatDialogRef<ProjectInfoModal>,
    @Inject(MAT_DIALOG_DATA)
    public data: {project: ProjectModel}
  ) {
    if (this.data && this.data.project) {
      this.project = {...this.data.project};
    }
  }

  ngOnInit(): void {}

  save() {
    this.project.id
      ? this.localizationService.updateProject(this.project)
      : this.localizationService.createProject(this.project.name, this.project.origin);
    this.dialog.close();
  }
}
