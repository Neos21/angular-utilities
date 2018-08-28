import { NgModule } from '@angular/core';

import { AccordionModule } from 'ngx-bootstrap/accordion';

import { SharedModule } from '../../shared/shared.module';

import { DetectCharacterRoutingModule } from './detect-character-routing.module';
import { DetectCharacterComponent } from './detect-character/detect-character.component';

@NgModule({
  imports: [
    AccordionModule.forRoot(),
    SharedModule,
    DetectCharacterRoutingModule
  ],
  declarations: [
    DetectCharacterComponent
  ]
})
export class DetectCharacterModule { }
