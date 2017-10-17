import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FontFamilyTesterRoutingModule } from './font-family-tester-routing.module';
import { FontFamilyTesterComponent } from './font-family-tester/font-family-tester.component';

@NgModule({
  imports: [
    CommonModule,
    FontFamilyTesterRoutingModule
  ],
  declarations: [
    FontFamilyTesterComponent
  ]
})
export class FontFamilyTesterModule { }
