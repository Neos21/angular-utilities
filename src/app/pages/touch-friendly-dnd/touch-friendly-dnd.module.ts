import { NgModule } from '@angular/core';

import { NgxDnDModule } from '@swimlane/ngx-dnd';

import { SharedModule } from '../../shared/shared.module';

import { TouchFriendlyDndRoutingModule } from './touch-friendly-dnd-routing.module';
import { TouchFriendlyDndComponent } from './touch-friendly-dnd/touch-friendly-dnd.component';

@NgModule({
  imports: [
    NgxDnDModule,
    SharedModule,
    TouchFriendlyDndRoutingModule
  ],
  declarations: [
    TouchFriendlyDndComponent
  ]
})
export class TouchFriendlyDndModule { }
