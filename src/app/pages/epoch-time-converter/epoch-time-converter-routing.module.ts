import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EpochTimeConverterComponent } from './epoch-time-converter/epoch-time-converter.component';

const routes: Routes = [
  { path: 'epoch-time-converter', component: EpochTimeConverterComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EpochTimeConverterRoutingModule { }
