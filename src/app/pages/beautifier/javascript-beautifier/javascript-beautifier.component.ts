import { Component, DoCheck } from '@angular/core';

import * as jsBeautify from 'js-beautify';

/**
 * JavaScript Beautifier
 */
@Component({
  selector: 'app-javascript-beautifier',
  templateUrl: './javascript-beautifier.component.html',
  styleUrls: ['./javascript-beautifier.component.scss']
})
export class JavaScriptBeautifierComponent implements DoCheck {
  /** 入力値 */
  public input: string = '';
  /** 出力値 */
  public output: string = '';
  
  /** 入力値の変更時に整形したテキストを出力する */
  public ngDoCheck(): void {
    this.output = jsBeautify.js(this.input, {
      indent_size: 2,
      break_chained_methods: true,
      space_before_conditional: false
    });
  }
}
