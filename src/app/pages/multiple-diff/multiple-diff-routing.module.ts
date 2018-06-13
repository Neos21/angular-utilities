import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MultipleDiffComponent } from './multiple-diff/multiple-diff.component';

const routes: Routes = [
  { path: 'multiple-diff', component: MultipleDiffComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MultipleDiffRoutingModule { }
