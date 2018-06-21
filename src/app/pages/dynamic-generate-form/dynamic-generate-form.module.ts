import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';

import { DynamicGenerateFormRoutingModule } from './dynamic-generate-form-routing.module';
import { DynamicGenerateFormComponent } from './dynamic-generate-form/dynamic-generate-form.component';

@NgModule({
  imports: [
    SharedModule,
    DynamicGenerateFormRoutingModule
  ],
  declarations: [
    DynamicGenerateFormComponent
  ]
})
export class DynamicGenerateFormModule { }
