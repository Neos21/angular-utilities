import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';

import { RegExpRoutingModule } from './regexp-routing.module';
import { RegExpComponent } from './regexp/regexp.component';

@NgModule({
  imports: [
    SharedModule,
    RegExpRoutingModule
  ],
  declarations: [
    RegExpComponent
  ]
})
export class RegExpModule { }
