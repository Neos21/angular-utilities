import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';

import { GuitarScaleGeneratorRoutingModule } from './guitar-scale-generator-routing.module';
import { GuitarScaleGeneratorComponent } from './guitar-scale-generator/guitar-scale-generator.component';

@NgModule({
  imports: [
    SharedModule,
    GuitarScaleGeneratorRoutingModule
  ],
  declarations: [
    GuitarScaleGeneratorComponent
  ]
})
export class GuitarScaleGeneratorModule { }
