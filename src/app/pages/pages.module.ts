import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { HomeModule } from './home/home.module';
import { IndexModule } from './index/index.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    IndexModule,
    HomeModule
  ],
  declarations: []
})
export class PagesModule { }
