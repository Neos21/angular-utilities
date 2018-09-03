import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DetectCharacterComponent } from './detect-character/detect-character.component';

const routes: Routes = [
  { path: 'detect-character', component: DetectCharacterComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetectCharacterRoutingModule { }
