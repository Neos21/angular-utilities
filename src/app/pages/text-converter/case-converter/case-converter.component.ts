import { Component, DoCheck } from '@angular/core';

import * as _ from 'lodash';

/**
 * Case Converter
 * 
 * 入力値を様々なケースに変換する。
 */
@Component({
  selector: 'app-case-converter',
  templateUrl: './case-converter.component.html',
  styleUrls: ['./case-converter.component.scss']
})
export class CaseConverterComponent implements DoCheck {
  /** 入力値 */
  public input: string = '';
  
  /**
   * 様々なケースに変換するオブジェクトたち
   * 
   * - title : 画面に表示する「変換方法」
   * - value : テキストエリアに表示する「変換結果」
   * - transform : 行データを変換し返却する関数
   * - isCollapsed : 行を縮小表示するかどうか
   */
  // tslint:disable:arrow-parens
  public cases: any = {
    pascal    : { title: 'パスカルケース',         value: '', transform: line => _.upperFirst(_.camelCase(line)), isCollapsed: false },
    camel     : { title: 'キャメルケース',         value: '', transform: line => _.camelCase(line)              , isCollapsed: false },
    kebab     : { title: 'ハイフンケース',         value: '', transform: line => _.kebabCase(line)              , isCollapsed: false },
    snake     : { title: 'スネークケース',         value: '', transform: line => _.snakeCase(line)              , isCollapsed: false },
    upperSnake: { title: 'アッパースネークケース', value: '', transform: line => _.toUpper(_.snakeCase(line))   , isCollapsed: false },
    lower     : { title: 'ロウワーケース',         value: '', transform: line => _.lowerCase(line)              , isCollapsed: false },
    upper     : { title: 'アッパーケース',         value: '', transform: line => _.upperCase(line)              , isCollapsed: false }
  };
  
  /**
   * 変更を監視してケースを変換する
   */
  public ngDoCheck(): void {
    const lines = this.input.split('\n');
    Object.keys(this.cases).forEach((key) => {
      this.cases[key].value = lines.map((line) => {
        return this.cases[key].transform(line);
      }).join('\n');
    });
  }
}
