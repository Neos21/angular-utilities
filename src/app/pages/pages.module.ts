import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { TouchFriendlyDndModule } from 'app/pages/touch-friendly-dnd/touch-friendly-dnd.module';
import { CsvFileToTableModule } from './csv-file-to-table/csv-file-to-table.module';
import { FontFamilyTesterModule } from './font-family-tester/font-family-tester.module';
import { IndexModule } from './index/index.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    IndexModule,
    FontFamilyTesterModule,
    CsvFileToTableModule,
    TouchFriendlyDndModule
  ]
})
export class PagesModule { }
