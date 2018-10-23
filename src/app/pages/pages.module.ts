import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { TouchFriendlyDndModule } from 'app/pages/touch-friendly-dnd/touch-friendly-dnd.module';
import { BeautifierModule } from './beautifier/beautifier.module';
import { CalculatorModule } from './calculator/calculator.module';
import { ColourConverterModule } from './colour-converter/colour-converter.module';
import { CsvFileToTableModule } from './csv-file-to-table/csv-file-to-table.module';
import { DateTimeCountdownModule } from './date-time-countdown/date-time-countdown.module';
import { DetectCharacterModule } from './detect-character/detect-character.module';
import { DrawTriangleSvgModule } from './draw-triangle-svg/draw-triangle-svg.module';
import { DynamicGenerateFormModule } from './dynamic-generate-form/dynamic-generate-form.module';
import { EncoderDecoderModule } from './encoder-decoder/encoder-decoder.module';
import { EpochTimeConverterModule } from './epoch-time-converter/epoch-time-converter.module';
import { FontFamilyTesterModule } from './font-family-tester/font-family-tester.module';
import { GuitarScaleGeneratorModule } from './guitar-scale-generator/guitar-scale-generator.module';
import { IndexModule } from './index/index.module';
import { MultipleDiffModule } from './multiple-diff/multiple-diff.module';
import { RegExpModule } from './regexp/regexp.module';
import { TextConverterModule } from './text-converter/text-converter.module';

@NgModule({
  imports: [
    SharedModule,
    IndexModule,
    FontFamilyTesterModule,
    CsvFileToTableModule,
    TouchFriendlyDndModule,
    MultipleDiffModule,
    TextConverterModule,
    DynamicGenerateFormModule,
    CalculatorModule,
    BeautifierModule,
    RegExpModule,
    ColourConverterModule,
    EpochTimeConverterModule,
    EncoderDecoderModule,
    DetectCharacterModule,
    DateTimeCountdownModule,
    DrawTriangleSvgModule,
    GuitarScaleGeneratorModule
  ]
})
export class PagesModule { }
