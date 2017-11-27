import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';

import { DndDraggableDirective } from './directives/dnd-draggable.directive';
import { DndDroppableDirective } from './directives/dnd-droppable.directive';
import { DndService } from './services/dnd.service';
import { TouchFriendlyDndRoutingModule } from './touch-friendly-dnd-routing.module';
import { TouchFriendlyDndComponent } from './touch-friendly-dnd/touch-friendly-dnd.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    TouchFriendlyDndRoutingModule
  ],
  declarations: [
    TouchFriendlyDndComponent,
    DndDroppableDirective,
    DndDraggableDirective
  ],
  providers: [
    DndService
  ]
})
export class TouchFriendlyDndModule { }
