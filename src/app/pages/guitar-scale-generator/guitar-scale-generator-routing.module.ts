import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GuitarScaleGeneratorComponent } from './guitar-scale-generator/guitar-scale-generator.component';

const routes: Routes = [
  { path: 'guitar-scale-generator', component: GuitarScaleGeneratorComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GuitarScaleGeneratorRoutingModule { }
