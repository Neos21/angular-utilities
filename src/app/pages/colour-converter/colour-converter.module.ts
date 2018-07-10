import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';

import { ColourConverterRoutingModule } from './colour-converter-routing.module';
import { ColourConverterComponent } from './colour-converter/colour-converter.component';

@NgModule({
  imports: [
    SharedModule,
    ColourConverterRoutingModule
  ],
  declarations: [
    ColourConverterComponent
  ]
})
export class ColourConverterModule { }
