import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AcceptGuard } from '../../shared/guards/accept.guard';

import { TouchFriendlyDndComponent } from './touch-friendly-dnd/touch-friendly-dnd.component';

const routes: Routes = [
  { path: 'touch-friendly-dnd', component: TouchFriendlyDndComponent, canActivate: [AcceptGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TouchFriendlyDndRoutingModule { }
