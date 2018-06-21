import { NgModule } from '@angular/core';

import { AccordionModule } from 'ngx-bootstrap/accordion';

import { SharedModule } from '../../shared/shared.module';

import { FontFamilyTesterRoutingModule } from './font-family-tester-routing.module';
import { FontFamilyTesterComponent } from './font-family-tester/font-family-tester.component';

@NgModule({
  imports: [
    AccordionModule.forRoot(),
    SharedModule,
    FontFamilyTesterRoutingModule
  ],
  declarations: [
    FontFamilyTesterComponent
  ]
})
export class FontFamilyTesterModule { }
