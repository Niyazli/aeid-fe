import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';

const modules = [MatSidenavModule, MatButtonModule, MatMenuModule, MatIconModule];

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [...modules],
})
export class MaterialModule {}
