import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';

import { CsvFileToTableRoutingModule } from './csv-file-to-table-routing.module';
import { CsvFileToTableComponent } from './csv-file-to-table/csv-file-to-table.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    CsvFileToTableRoutingModule
  ],
  declarations: [
    CsvFileToTableComponent
  ]
})
export class CsvFileToTableModule { }
