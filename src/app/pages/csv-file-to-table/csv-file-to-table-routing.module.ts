import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CsvFileToTableComponent } from './csv-file-to-table/csv-file-to-table.component';

const routes: Routes = [
  { path: 'csv-file-to-table', component: CsvFileToTableComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CsvFileToTableRoutingModule { }
