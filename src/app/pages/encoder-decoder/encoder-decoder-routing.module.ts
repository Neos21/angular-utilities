import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EncoderDecoderComponent } from './encoder-decoder/encoder-decoder.component';

const routes: Routes = [
  { path: 'encoder-decoder', component: EncoderDecoderComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EncoderDecoderRoutingModule { }
