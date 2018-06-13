import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';

import { MultipleDiffRoutingModule } from './multiple-diff-routing.module';
import { MultipleDiffComponent } from './multiple-diff/multiple-diff.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    MultipleDiffRoutingModule
  ],
  declarations: [
    MultipleDiffComponent
  ]
})
export class MultipleDiffModule { }
