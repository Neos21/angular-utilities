import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';

import { CalculatorRoutingModule } from './calculator-routing.module';
import { CalculatorComponent } from './calculator/calculator.component';

@NgModule({
  imports: [
    SharedModule,
    CalculatorRoutingModule
  ],
  declarations: [
    CalculatorComponent
  ]
})
export class CalculatorModule { }
