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
export class MultipleDiffRoutingModule {
  public texts: any[] = [
    {
      fileName: 'a.txt',
      rawText: `{
  "name": "project-a",
  "version": "1.0.0",
  "dependencies": {
    "@neos21/neos21": "0.0.0"
  }
}`
    },
    {
      fileName: 'b.txt',
      rawText: `{
  "name": "project-b",
  "version": "1.0.0",
  "dependencies": {
    "@neos21/ccc": "0.0.2",
    "@neos21/neos21": "0.0.0"
  }
}`
    },
    {
      fileName: 'c.txt',
      rawText: `{
  "name": "project-c",
  "private": true,
  "version": "1.0.0",
  "dependencies": {
    "@neos21/neos21": "0.0.0"
  }
}`
    }
  ];
  
  public onDiff(): void {
    
  }
}
