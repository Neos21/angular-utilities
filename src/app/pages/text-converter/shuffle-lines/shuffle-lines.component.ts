import { Component, DoCheck } from '@angular/core';

/**
 * Shuffle Lines
 * 
 * 入力されたテキストを行ごとにシャッフルする
 */
@Component({
  selector: 'app-shuffle-lines',
  templateUrl: './shuffle-lines.component.html',
  styleUrls: ['./shuffle-lines.component.scss']
})
export class ShuffleLinesComponent implements DoCheck {
  /** 入力値 */
  public input: string = '';
  /** 出力値 */
  public output: string = '';
  
  /**
   * 変更を監視してシャッフルする
   */
  public ngDoCheck(): void {
    this.output = this.fisherYatesShuffle(this.input.split('\n')).join('\n');
  }
  
  /**
   * 文字列の配列をシャッフルする
   * 
   * @param array 文字列の配列
   * @return シャッフルした文字列の配列
   */
  private fisherYatesShuffle(array: Array<string>): Array<string> {
    for(let index = array.length - 1; index >= 0; index--) {
      const randomIndex = Math.floor(Math.random() * (index + 1));
      [array[index], array[randomIndex]] = [array[randomIndex], array[index]];
    }
    return array;
  }
}
