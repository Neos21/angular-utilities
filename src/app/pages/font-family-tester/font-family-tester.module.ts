import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DndModule } from 'ng2-dnd';

import { AccordionModule } from 'ngx-bootstrap/accordion';

import { FontFamilyTesterRoutingModule } from './font-family-tester-routing.module';
import { FontFamilyTesterComponent } from './font-family-tester/font-family-tester.component';

@NgModule({
  imports: [
    CommonModule,
    DndModule.forRoot(),
    AccordionModule.forRoot(),
    FontFamilyTesterRoutingModule
  ],
  declarations: [
    FontFamilyTesterComponent
  ]
})
export class FontFamilyTesterModule { }
