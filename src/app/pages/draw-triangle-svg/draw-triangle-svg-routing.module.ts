import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DrawTriangleSvgComponent } from './draw-triangle-svg/draw-triangle-svg.component';

const routes: Routes = [
  { path: 'draw-triangle-svg', component: DrawTriangleSvgComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DrawTriangleSvgRoutingModule { }
