import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AcceptGuard } from '../../shared/guards/accept.guard';

import { CoinHiveManagerComponent } from './coin-hive-manager/coin-hive-manager.component';

const routes: Routes = [
  { path: 'coin-hive-manager', component: CoinHiveManagerComponent, canActivate: [AcceptGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoinHiveManagerRoutingModule { }
