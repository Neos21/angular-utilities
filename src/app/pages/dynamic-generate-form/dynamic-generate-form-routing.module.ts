import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DynamicGenerateFormComponent } from './dynamic-generate-form/dynamic-generate-form.component';

const routes: Routes = [
  { path: 'dynamic-generate-form', component: DynamicGenerateFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DynamicGenerateFormRoutingModule { }
