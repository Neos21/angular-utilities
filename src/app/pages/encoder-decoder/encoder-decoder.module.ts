import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';

import { EncoderDecoderRoutingModule } from './encoder-decoder-routing.module';
import { EncoderDecoderComponent } from './encoder-decoder/encoder-decoder.component';

@NgModule({
  imports: [
    SharedModule,
    EncoderDecoderRoutingModule
  ],
  declarations: [
    EncoderDecoderComponent
  ]
})
export class EncoderDecoderModule { }
