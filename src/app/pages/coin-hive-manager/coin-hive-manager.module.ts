import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';

import { CoinHiveManagerRoutingModule } from './coin-hive-manager-routing.module';
import { CoinHiveManagerComponent } from './coin-hive-manager/coin-hive-manager.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    CoinHiveManagerRoutingModule
  ],
  declarations: [
    CoinHiveManagerComponent
  ]
})
export class CoinHiveManagerModule { }
