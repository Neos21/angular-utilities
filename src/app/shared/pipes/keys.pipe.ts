import { Pipe, PipeTransform } from '@angular/core';

/**
 * 連想配列のキーの配列を返すパイプ
 * 
 * オブジェクトを *ngFor でループさせたい時に。
 */
@Pipe({
  name: 'keys'
})
export class KeysPipe implements PipeTransform {
  /**
   * 変換処理
   * 
   * @param value パイプで渡される値
   * @param args パイプの引数
   */
  public transform(value: any, args?: any): any {
    return Object.keys(value);
  }
}
