import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';

import { DateTimeCountdownRoutingModule } from './date-time-countdown-routing.module';
import { DateTimeCountdownComponent } from './date-time-countdown/date-time-countdown.component';

@NgModule({
  imports: [
    SharedModule,
    DateTimeCountdownRoutingModule
  ],
  declarations: [
    DateTimeCountdownComponent
  ]
})
export class DateTimeCountdownModule { }
