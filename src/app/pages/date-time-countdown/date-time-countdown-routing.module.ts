import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DateTimeCountdownComponent } from './date-time-countdown/date-time-countdown.component';

const routes: Routes = [
  { path: 'date-time-countdown', component: DateTimeCountdownComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DateTimeCountdownRoutingModule { }
