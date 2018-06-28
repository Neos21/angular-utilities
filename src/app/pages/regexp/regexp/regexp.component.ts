import { Component, DoCheck } from '@angular/core';

/**
 * RegExp
 */
@Component({
  selector: 'app-regexp',
  templateUrl: './regexp.component.html',
  styleUrls: ['./regexp.component.scss']
})
export class RegExpComponent implements DoCheck {
  /** 置換対象文字列 */
  public inputText: string = '';
  /** 検索文字列 (正規表現) */
  public inputRegExp: string = '';
  /** 置換文字列 */
  public inputReplace: string = '';
  /** 結果 */
  public output: string = '';
  
  /** テキストを置換する */
  public ngDoCheck(): void {
    if(!this.inputText || !this.inputRegExp) {
      this.output = '';
      
      return;
    }
    
    try {
      const regexp = new RegExp(this.inputRegExp, 'g');
      this.output = this.inputText.replace(regexp, this.inputReplace);
    }
    catch(error) {
      this.output = error;
    }
  }
}
