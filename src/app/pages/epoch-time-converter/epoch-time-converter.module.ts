import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';

import { EpochTimeConverterRoutingModule } from './epoch-time-converter-routing.module';
import { EpochTimeConverterComponent } from './epoch-time-converter/epoch-time-converter.component';

@NgModule({
  imports: [
    SharedModule,
    EpochTimeConverterRoutingModule
  ],
  declarations: [
    EpochTimeConverterComponent
  ]
})
export class EpochTimeConverterModule { }
