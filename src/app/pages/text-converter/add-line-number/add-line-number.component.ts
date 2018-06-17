import { Component, DoCheck } from '@angular/core';

/**
 * Add Line Number
 * 
 * 行番号を付与する
 */
@Component({
  selector: 'app-add-line-number',
  templateUrl: './add-line-number.component.html',
  styleUrls: ['./add-line-number.component.scss']
})
export class AddLineNumberComponent implements DoCheck {
  /** 変換前の入力値 */
  public src: string = '';
  /** 変換後の出力値 */
  public dest: string = '';
  /** オプション */
  public options: any = {
    /** 行番号の書式 */
    lineNumberStyle: 'none',
    /** 接頭辞 */
    prefix: '',
    /** デリミタ */
    delimiter: ':',
    /** 接尾辞 */
    suffix: '',
    /** 行番号の出力位置 */
    lineNumberPosition: 'beforeSrc'
  };
  
  /**
   * 変更を検知して処理する
   * 
   * [(ngModel)] を設定した input[type="radio"] は、name 属性も付与しておかないと、input[type="radio"] 内での区別が付かず、
   * 選択したラジオボタングループとは別のグループのチェックが外れてしまう
   */
  public ngDoCheck(): void {
    this.addLineNumber();
  }

  /** 行番号を付与する */
  private addLineNumber(): void {
    // 入力値が空の場合は特に処理しない
    if(this.src === '') {
      this.dest = '';
      
      return;
    }
    
    // 入力値を行ごとに分ける
    const srcLines = this.src.split('\n');
    // 入力値の行の桁数を数える
    const lineDigit = `${srcLines.length}`.length;
    
    this.dest = srcLines.map((line, index) => {
      // 行番号を整形する
      let lineNumber = `${index + 1}`;
      if(this.options.lineNumberStyle === 'zeroPadding') {
        lineNumber = `${'0'.repeat(lineDigit)}${lineNumber}`.slice(-lineDigit);
      }
      else if(this.options.lineNumberStyle === 'alignRight') {
        lineNumber = `${' '.repeat(lineDigit)}${lineNumber}`.slice(-lineDigit);
      }
      
      // 行番号の出力位置に応じて結果を返す
      if(this.options.lineNumberPosition === 'beforeSrc') {
        return `${this.options.prefix}${lineNumber}${this.options.delimiter}${line}${this.options.suffix}`;
      }
      else if(this.options.lineNumberPosition === 'afterSrc') {
        return `${this.options.prefix}${line}${this.options.delimiter}${lineNumber}${this.options.suffix}`;
      }
      else {  // this.options.lineNumberPosition === 'none'
        return `${this.options.prefix}${line}${this.options.suffix}`;
      }
    }).join('\n');
  }
}
