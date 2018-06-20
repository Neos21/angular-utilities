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
   * 結果
   * 
   * - title : 画面に表示する「変換方法」
   * - value : テキストエリアに表示する「変換結果」
   * - data : 変換したのデータを行ごとに格納した配列
   * - transform : 行データを変換し返却する関数
   * - isCollapsed : 行を縮小表示するかどうか
   */
  // tslint:disable:max-line-length
  public results: any = {
    pascal    : { title: 'パスカルケース',         value: '', data: [], transform: (line) => { return _.upperFirst(_.camelCase(line)); }, isCollapsed: false },
    camel     : { title: 'キャメルケース',         value: '', data: [], transform: (line) => { return _.camelCase(line);               }, isCollapsed: false },
    kebab     : { title: 'ハイフンケース',         value: '', data: [], transform: (line) => { return _.kebabCase(line);               }, isCollapsed: false },
    snake     : { title: 'スネークケース',         value: '', data: [], transform: (line) => { return _.snakeCase(line);               }, isCollapsed: false },
    upperSnake: { title: 'アッパースネークケース', value: '', data: [], transform: (line) => { return _.toUpper(_.snakeCase(line));    }, isCollapsed: false },
    lower     : { title: 'ロウワーケース',         value: '', data: [], transform: (line) => { return _.lowerCase(line);               }, isCollapsed: false },
    upper     : { title: 'アッパーケース',         value: '', data: [], transform: (line) => { return _.upperCase(line);               }, isCollapsed: false }
  };
  // tslint:enable
  
  /**
   * 変更を監視してケースを変換する
   */
  public ngDoCheck(): void {
    this.input.split('\n').forEach((line) => {
      Object.keys(this.results).forEach((key) => {
        this.results[key].data.push(this.results[key].transform(line));
      });
    });
    
    Object.keys(this.results).forEach((key) => {
      this.results[key].value = this.results[key].data.join('\n');
      this.results[key].data = [];
    });
  }
}
