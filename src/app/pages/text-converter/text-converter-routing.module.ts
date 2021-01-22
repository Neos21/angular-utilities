import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddLineNumberComponent } from './add-line-number/add-line-number.component';
import { CaseConverterComponent } from './case-converter/case-converter.component';
import { NormalizeToNfcComponent } from './normalize-to-nfc/normalize-to-nfc.component';
import { ShuffleLinesComponent } from './shuffle-lines/shuffle-lines.component';

const routes: Routes = [
  {
    path: 'text-converter',
    children: [
      { path: 'add-line-number', component: AddLineNumberComponent },
      { path: 'case-converter', component: CaseConverterComponent },
      { path: 'normalize-to-nfc', component: NormalizeToNfcComponent },
      { path: 'shuffle-lines', component: ShuffleLinesComponent },
      { path: '', redirectTo: '/', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TextConverterRoutingModule { }
