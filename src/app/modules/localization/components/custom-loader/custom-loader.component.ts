import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: '[custom-loader]',
  template: `
    <div class="wrapper" *ngIf="loadingState">
      <mat-spinner class="wrapper-loading" mode="indeterminate" *ngIf="isSpinnerType; else progressBar" color="primary"></mat-spinner>
      <ng-template #progressBar>
        <mat-progress-bar class="wrapper-loading" mode="indeterminate" color="primary"></mat-progress-bar>
      </ng-template>
    </div>
    <ng-content></ng-content>

  `,
  styleUrls: ['./custom-loader.component.scss']
})
export class CustomLoaderComponent implements OnInit {
  @Input() loadingState: boolean;
  @Input() isSpinnerType: boolean;
  constructor() { }

  ngOnInit(): void {
  }

}
