import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';

import { CsvFileToTableRoutingModule } from './csv-file-to-table-routing.module';
import { CsvFileToTableComponent } from './csv-file-to-table/csv-file-to-table.component';

@NgModule({
  imports: [
    SharedModule,
    CsvFileToTableRoutingModule
  ],
  declarations: [
    CsvFileToTableComponent
  ]
})
export class CsvFileToTableModule { }
