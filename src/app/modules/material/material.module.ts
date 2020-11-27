import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';

const modules = [MatSidenavModule, MatButtonModule];

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: modules,
})
export class MaterialModule {}
