import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';

import { AddLineNumberComponent } from './add-line-number/add-line-number.component';
import { TextConverterRoutingModule } from './text-converter-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    TextConverterRoutingModule
  ],
  declarations: [
    AddLineNumberComponent
  ]
})
export class TextConverterModule { }
