import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';

import { DynamicGenerateFormRoutingModule } from './dynamic-generate-form-routing.module';
import { DynamicGenerateFormComponent } from './dynamic-generate-form/dynamic-generate-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    DynamicGenerateFormRoutingModule
  ],
  declarations: [
    DynamicGenerateFormComponent
  ]
})
export class DynamicGenerateFormModule { }
