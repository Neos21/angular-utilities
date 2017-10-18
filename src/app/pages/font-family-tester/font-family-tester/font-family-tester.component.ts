import { Component } from '@angular/core';

/**
 * Font Family Tester
 * 
 * - 指定したいフォントを D&D で追加・変更・入れ替えて並べ、動的に font-family を適用する。
 * - TODO : プリセット外のフォント名もテキストボックスより追加できるようにする。
 */
@Component({
  selector: 'app-font-family-tester',
  templateUrl: './font-family-tester.component.html',
  styleUrls: ['./font-family-tester.component.scss']
})
export class FontFamilyTesterComponent {
  /** font-family として指定するフォントの配列 */
  fontList: Array<string> = [
  ];
  
  /** 候補フォント一覧 : sans-serif */
  stockSansSerif: Array<any> = [
    // Apple システムフォント
    `-apple-system`     ,
    `BlinkMacSystemFont`,
    // 英字フォント
    `HelveticaNeue`   ,
    `"Helvetica Neue"`,
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
  stockSerif: Array<string> = [
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
  stockMonospace: Array<string> = [
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
  
  constructor() {
    // TODO : 初期値設定 … 配列から指定の名前のデータを取得し、その要素は取り除きたい
  }
}
