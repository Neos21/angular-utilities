import { Component } from '@angular/core';

/**
 * Font Family Tester
 * 
 * 指定したいフォントを D&D で追加・変更・入れ替えて並べ、動的に font-family を適用する。
 * プリセット外のフォント名もテキストボックスより追加可能。
 */
@Component({
  selector: 'app-font-family-tester',
  templateUrl: './font-family-tester.component.html',
  styleUrls: ['./font-family-tester.component.scss']
})
export class FontFamilyTesterComponent {
  /** 太字変更 */
  public previewWeight: boolean = false;
  
  /** 斜体変更 */
  public previewStyle: boolean = false;
  
  /** フォントサイズ変更 */
  public previewSize: boolean = true;
  
  /** font-family として指定するフォントの配列 */
  public fontList: Array<string> = [];
  
  /** 候補フォント一覧 : sans-serif */
  public stockSansSerif: Array<any> = [
    // Apple システムフォント
    `-apple-system`     ,
    `BlinkMacSystemFont`,
    // 英字フォント
    `"Helvetica Neue"`,
    `HelveticaNeue`   ,
    `"Segoe UI"`      ,
    `Helvetica`       ,
    `Arial`           ,
    `Verdana`         ,
    // 游ゴシック
    `"游ゴシック体"`     ,
    `YuGothic`           ,
    `"Yu Gothic M"`      ,  // @font-face 使用
    `"游ゴシック Medium"`,
    `"Yu Gothic Medium"` ,
    `"游ゴシック"`       ,
    `"Yu Gothic"`        ,
    // ヒラギノ・メイリオ
    `"ヒラギノ角ゴ ProN W3"`        ,
    `"Hiragino Kaku Gothic ProN W3"`,
    `HiraKakuProN-W3`               ,
    `"ヒラギノ角ゴ ProN"`           ,
    `"Hiragino Kaku Gothic ProN"`   ,
    `"ヒラギノ角ゴ Pro"`            ,
    `"Hiragino Kaku Gothic Pro"`    ,
    `"メイリオ"`                    ,
    `Meiryo`                        ,
    // Osaka・MS P ゴシック
    `Osaka`            ,
    `"ＭＳ Ｐゴシック"`,
    `"MS PGothic"`     ,
    // 総称
    `sans-serif`
  ];
  
  /** 候補フォント一覧 : serif */
  public stockSerif: Array<string> = [
    // 英字フォント
    `Georgia`,
    // 游明朝
    `"游明朝体"` ,
    `"YuMincho"` ,
    `"游明朝"`   ,
    `"Yu Mincho"`,
    // ヒラギノ・HG 明朝
    `"ヒラギノ明朝 ProN W3"`   ,
    `"Hiragino Mincho ProN W3"`,
    `HiraMinProN-W3`           ,
    `"ヒラギノ明朝 ProN"`      ,
    `"Hiragino Mincho ProN"`   ,
    `"ヒラギノ明朝 Pro"`       ,
    `"Hiragino Mincho Pro"`    ,
    `"HG明朝E"`                ,
    `"HGS明朝E"`               ,
    // MS P 明朝
    `"ＭＳ Ｐ明朝"`            ,
    `"MS PMincho"`             ,
    // 総称
    `serif`
  ];
  
  /** 候補フォント一覧 : monospace */
  public stockMonospace: Array<string> = [
    // サードパーティ
    `MeiryoKe_Gothic`   ,
    `"Ricty Diminished"`,
    // 英字フォント
    `"Courier New"`,
    `Courier`      ,
    `Consolas`     ,
    `Monaco`       ,
    `Menlo`        ,
    // Osaka-mono・MS ゴシック
    `"Osaka－等幅"`  ,
    `"Osaka-等幅"`   ,
    `Osaka-mono`     ,
    `"ＭＳ ゴシック"`,
    `"MS Gothic"`    ,
    // 総称
    `monospace`
  ];
  
  /** 候補フォント一覧 : 独自 */
  public stockOriginal: Array<string> = [];
  
  /** 独自追加するフォントの入力欄 */
  public originalFont: string = '';
  
  /**
   * フォントを独自に追加する
   */
  addOriginalFont(): void {
    // 空欄やスペースのみなら何もしない
    if(this.originalFont === '' || /^\s+$/g.test(this.originalFont)) {
      return;
    }
    
    // 受け取った文字を候補フォント一覧に追加する
    this.stockOriginal.unshift(this.originalFont);
    // 未入力状態に戻す
    this.originalFont = '';
  }
}
