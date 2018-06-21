import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { TouchFriendlyDndModule } from 'app/pages/touch-friendly-dnd/touch-friendly-dnd.module';
import { CalculatorModule } from './calculator/calculator.module';
import { CsvFileToTableModule } from './csv-file-to-table/csv-file-to-table.module';
import { DynamicGenerateFormModule } from './dynamic-generate-form/dynamic-generate-form.module';
import { FontFamilyTesterModule } from './font-family-tester/font-family-tester.module';
import { IndexModule } from './index/index.module';
import { MultipleDiffModule } from './multiple-diff/multiple-diff.module';
import { TextConverterModule } from './text-converter/text-converter.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    IndexModule,
    FontFamilyTesterModule,
    CsvFileToTableModule,
    TouchFriendlyDndModule,
    MultipleDiffModule,
    TextConverterModule,
    DynamicGenerateFormModule,
    CalculatorModule
  ]
})
export class PagesModule { }
