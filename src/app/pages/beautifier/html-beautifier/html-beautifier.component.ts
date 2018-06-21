import { Component, DoCheck } from '@angular/core';

import * as jsBeautify from 'js-beautify';

/**
 * HTML Beautifier
 */
@Component({
  selector: 'app-html-beautifier',
  templateUrl: './html-beautifier.component.html',
  styleUrls: ['./html-beautifier.component.scss']
})
export class HtmlBeautifierComponent implements DoCheck {
  /** 入力値 */
  public input: string = '';
  /** 出力値 */
  public output: string = '';
  
  /** 入力値の変更時に整形したテキストを出力する */
  public ngDoCheck(): void {
    this.output = jsBeautify.html(this.input, {
      indent_size: 2,
      indent_inner_html: true,
      max_preserve_newlines: 5,
      extra_liners: [],
      // JavaScript
      break_chained_methods: true,
      space_before_conditional: false
    });
  }
}
