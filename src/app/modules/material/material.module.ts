import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatDividerModule} from '@angular/material/divider';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {MatOptionModule} from '@angular/material/core';
import {MatSliderModule} from '@angular/material/slider';

const modules = [
  MatSidenavModule,
  MatButtonModule,
  MatMenuModule,
  MatIconModule,
  MatListModule,
  MatDividerModule,
  MatToolbarModule,
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  MatSelectModule,
  MatOptionModule,
  MatSliderModule
];

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [...modules],
})
export class MaterialModule {}
