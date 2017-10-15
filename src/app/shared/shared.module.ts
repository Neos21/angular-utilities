import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AcceptGuard } from './guards/accept.guard';
import { CoinHiveService } from './services/coin-hive.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    AcceptGuard,
    CoinHiveService
  ]
})
export class SharedModule { }
