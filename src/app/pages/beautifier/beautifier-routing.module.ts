import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CssBeautifierComponent } from './css-beautifier/css-beautifier.component';
import { HtmlBeautifierComponent } from './html-beautifier/html-beautifier.component';
import { JavaScriptBeautifierComponent } from './javascript-beautifier/javascript-beautifier.component';

const routes: Routes = [
  {
    path: 'beautifier',
    children: [
      { path: 'javascript', component: JavaScriptBeautifierComponent },
      { path: 'html', component: HtmlBeautifierComponent },
      { path: 'css', component: CssBeautifierComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BeautifierRoutingModule { }
