import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';

import { DrawTriangleSvgRoutingModule } from './draw-triangle-svg-routing.module';
import { DrawTriangleSvgComponent } from './draw-triangle-svg/draw-triangle-svg.component';

@NgModule({
  imports: [
    SharedModule,
    DrawTriangleSvgRoutingModule
  ],
  declarations: [
    DrawTriangleSvgComponent
  ]
})
export class DrawTriangleSvgModule { }
