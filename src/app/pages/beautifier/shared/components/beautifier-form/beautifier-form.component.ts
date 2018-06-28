import { Component, DoCheck, Input } from '@angular/core';

import * as jsBeautify from 'js-beautify';

/**
 * Beautifier Form
 */
@Component({
  selector: 'app-beautifier-form',
  templateUrl: './beautifier-form.component.html',
  styleUrls: ['./beautifier-form.component.scss']
})
export class BeautifierFormComponent implements DoCheck {
  /** js-beautify の使用する関数名 : 'js'・'html'・'css' のいずれか */
  @Input()
  public language: string = '';
  
  /** js-beautify のオプション */
  @Input()
  public options: any = {};
  
  /** 入力値 */
  public input: string = '';
  
  /** 出力値 */
  public output: string = '';
  
  /** 入力値の変更時に整形したテキストを出力する */
  public ngDoCheck(): void {
    this.output = jsBeautify[this.language](this.input, this.options);
  }
}
