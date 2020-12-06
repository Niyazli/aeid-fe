import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HelpRoutingModule} from './help-routing.module';
import {HelpPageComponent} from './pages/help-page/help-page.component';
import { HelpBoxComponent } from './components/help-box/help-box.component';
import {MaterialModule} from '../../material/material.module';

@NgModule({
  declarations: [HelpPageComponent, HelpBoxComponent],
  imports: [CommonModule, HelpRoutingModule, MaterialModule],
})
export class HelpModule {}
