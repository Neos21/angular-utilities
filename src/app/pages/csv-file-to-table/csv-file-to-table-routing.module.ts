import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AcceptGuard } from '../../shared/guards/accept.guard';

import { CsvFileToTableComponent } from './csv-file-to-table/csv-file-to-table.component';

const routes: Routes = [
  { path: 'csv-file-to-table', component: CsvFileToTableComponent, canActivate: [AcceptGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CsvFileToTableRoutingModule { }
