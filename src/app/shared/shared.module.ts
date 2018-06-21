import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { KeysPipe } from './pipes/keys.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    KeysPipe
  ],
  exports: [
    // Re-Export
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    KeysPipe
  ]
})
export class SharedModule { }
