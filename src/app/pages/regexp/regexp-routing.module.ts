import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegExpComponent } from './regexp/regexp.component';

const routes: Routes = [
  { path: 'regexp', component: RegExpComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegExpRoutingModule { }
