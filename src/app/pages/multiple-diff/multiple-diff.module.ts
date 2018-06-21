import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';

import { MultipleDiffRoutingModule } from './multiple-diff-routing.module';
import { MultipleDiffComponent } from './multiple-diff/multiple-diff.component';

@NgModule({
  imports: [
    SharedModule,
    MultipleDiffRoutingModule
  ],
  declarations: [
    MultipleDiffComponent
  ]
})
export class MultipleDiffModule { }
