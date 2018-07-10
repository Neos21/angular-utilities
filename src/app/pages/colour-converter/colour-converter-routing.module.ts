import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ColourConverterComponent } from './colour-converter/colour-converter.component';

const routes: Routes = [
  {
    path: 'colour-converter',
    children: [
      { path: 'colour-converter', component: ColourConverterComponent },
      { path: '', redirectTo: '/', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ColourConverterRoutingModule { }
