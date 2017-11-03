import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { CoinHiveManagerModule } from './coin-hive-manager/coin-hive-manager.module';
import { FontFamilyTesterModule } from './font-family-tester/font-family-tester.module';
import { HomeModule } from './home/home.module';
import { IndexModule } from './index/index.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    IndexModule,
    HomeModule,
    FontFamilyTesterModule,
    CoinHiveManagerModule
  ],
  declarations: []
})
export class PagesModule { }
