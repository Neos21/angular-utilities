import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';

import { BeautifierRoutingModule } from './beautifier-routing.module';
import { CssBeautifierComponent } from './css-beautifier/css-beautifier.component';
import { HtmlBeautifierComponent } from './html-beautifier/html-beautifier.component';
import { JavaScriptBeautifierComponent } from './javascript-beautifier/javascript-beautifier.component';
import { BeautifierFormComponent } from './shared/components/beautifier-form/beautifier-form.component';

@NgModule({
  imports: [
    SharedModule,
    BeautifierRoutingModule
  ],
  declarations: [
    JavaScriptBeautifierComponent,
    HtmlBeautifierComponent,
    CssBeautifierComponent,
    BeautifierFormComponent
  ]
})
export class BeautifierModule { }
