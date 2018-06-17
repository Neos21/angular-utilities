import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddLineNumberComponent } from './add-line-number/add-line-number.component';

const routes: Routes = [
  {
    path: 'text-converter',
    children: [
      { path: 'add-line-number', component: AddLineNumberComponent },
      { path: '', redirectTo: '/', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TextConverterRoutingModule { }
