import { NgModule } from '@angular/core';

import { ClipboardModule } from 'ngx-clipboard';

import { SharedModule } from '../../shared/shared.module';

import { AddLineNumberComponent } from './add-line-number/add-line-number.component';
import { CaseConverterComponent } from './case-converter/case-converter.component';
import { NormalizeToNfcComponent } from './normalize-to-nfc/normalize-to-nfc.component';
import { TextConverterRoutingModule } from './text-converter-routing.module';
import { ShuffleLinesComponent } from './shuffle-lines/shuffle-lines.component';

@NgModule({
  imports: [
    SharedModule,
    TextConverterRoutingModule,
    ClipboardModule
  ],
  declarations: [
    AddLineNumberComponent,
    CaseConverterComponent,
    NormalizeToNfcComponent,
    ShuffleLinesComponent
  ]
})
export class TextConverterModule { }
