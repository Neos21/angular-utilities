import { Component, DoCheck } from '@angular/core';

import * as jsBeautify from 'js-beautify';

/**
 * CSS Beautifier
 */
@Component({
  selector: 'app-css-beautifier',
  templateUrl: './css-beautifier.component.html',
  styleUrls: ['./css-beautifier.component.scss']
})
export class CssBeautifierComponent implements DoCheck {
  /** 入力値 */
  public input: string = '';
  /** 出力値 */
  public output: string = '';
  
  /** 入力値の変更時に整形したテキストを出力する */
  public ngDoCheck(): void {
    this.output = jsBeautify.css(this.input, {
      indent_size: 2
    });
  }
}
