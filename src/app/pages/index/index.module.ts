import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';

import { IndexRoutingModule } from './index-routing.module';
import { IndexComponent } from './index/index.component';

@NgModule({
  imports: [
    SharedModule,
    IndexRoutingModule
  ],
  declarations: [
    IndexComponent
  ]
})
export class IndexModule { }
