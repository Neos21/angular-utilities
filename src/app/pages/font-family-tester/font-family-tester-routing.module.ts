import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AcceptGuard } from '../../shared/guards/accept.guard';

import { FontFamilyTesterComponent } from './font-family-tester/font-family-tester.component';

const routes: Routes = [
  { path: 'font-family-tester', component: FontFamilyTesterComponent, canActivate: [AcceptGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FontFamilyTesterRoutingModule { }
