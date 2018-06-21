import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';

import { BeautifierRoutingModule } from './beautifier-routing.module';
import { HtmlBeautifierComponent } from './html-beautifier/html-beautifier.component';
import { JavaScriptBeautifierComponent } from './javascript-beautifier/javascript-beautifier.component';
import { CssBeautifierComponent } from './css-beautifier/css-beautifier.component';

@NgModule({
  imports: [
    SharedModule,
    BeautifierRoutingModule
  ],
  declarations: [
    JavaScriptBeautifierComponent,
    HtmlBeautifierComponent,
    CssBeautifierComponent
  ]
})
export class BeautifierModule { }
