// tslint:disable:no-magic-numbers

import { Component, DoCheck } from '@angular/core';
import { ClipboardService } from 'ngx-clipboard';

@Component({
  selector: 'app-normalize-to-nfc',
  templateUrl: './normalize-to-nfc.component.html',
  styleUrls: ['./normalize-to-nfc.component.scss']
})
export class NormalizeToNfcComponent implements DoCheck {
  /** 入力値 */
  public input: string = '';
  /** 出力値 */
  public output: string = '';
  /** 入力値の文字とコードの配列 */
  public inputCodes: any[] = [];
  /** 出力値の文字とコードの配列 */
  public outputCodes: any[] = [];
  /** 単独の NFD 濁点・半濁点を通常の濁点・半濁点に置換する */
  public isConvertSingleMarks: boolean = true;
  /** 挿入するサンプル文字列の指定 */
  public example: number = 0;
  
  /** 清音文字の辞書 : 濁音文字の配置と揃えることで、同じ index 値で参照できるようにしておく */
  private uncombinedKanaDict: number[] = [
    0x304B, 0x304D, 0x304F, 0x3051, 0x3053,  // かきくけこ
    0x3055, 0x3057, 0x3059, 0x305B, 0x305D,  // さしすせそ
    0x305F, 0x3061, 0x3064, 0x3066, 0x3068,  // たちつてと
    0x306F, 0x3072, 0x3075, 0x3078, 0x307B,  // はひふへほ (ば行用)
    0x306F, 0x3072, 0x3075, 0x3078, 0x307B,  // はひふへほ (ぱ行用)
    0x3046,                                  // う
    0x30AB, 0x30AD, 0x30AF, 0x30B1, 0x30B3,  // カキクケコ
    0x30B5, 0x30B7, 0x30B9, 0x30BB, 0x30BD,  // サシスセソ
    0x30BF, 0x30C1, 0x30C4, 0x30C6, 0x30C8,  // タチツテト
    0x30CF, 0x30D2, 0x30D5, 0x30D8, 0x30DB,  // ハヒフヘホ (バ行用)
    0x30CF, 0x30D2, 0x30D5, 0x30D8, 0x30DB,  // ハヒフヘホ (パ行用)
    0x30A6                                   // ウ
  ];
  /** 濁音文字の辞書 : 清音文字の配置と揃えることで、同じ index 値で参照できるようにしておく */
  private combinedKanaDict: number[] = [
    0x304C, 0x304E, 0x3050, 0x3052, 0x3054,  // がぎぐげご
    0x3056, 0x3058, 0x305A, 0x305C, 0x305E,  // ざじずぜぞ
    0x3060, 0x3062, 0x3065, 0x3067, 0x3069,  // だぢづでど
    0x3070, 0x3073, 0x3076, 0x3079, 0x307C,  // ばびぶべぼ
    0x3071, 0x3074, 0x3077, 0x307A, 0x307D,  // ぱぴぷぺぽ
    0x3094,                                  // ゔ
    0x30AC, 0x30AE, 0x30B0, 0x30B2, 0x30B4,  // ガギグゲゴ
    0x30B6, 0x30B8, 0x30BA, 0x30BC, 0x30BE,  // ザジズゼゾ
    0x30C0, 0x30C2, 0x30C5, 0x30C7, 0x30C9,  // ダヂヅデド
    0x30D0, 0x30D3, 0x30D6, 0x30D9, 0x30DC,  // バビブベボ
    0x30D1, 0x30D4, 0x30D7, 0x30DA, 0x30DD,  // パピプペポ
    0x30F4                                   // ヴ
  ];
  /** NFD 濁点・半濁点 : ゛(0x309B)・゜(0x309C)・ﾞ(0xFF9E)・ﾟ(0xFF9F) とは別物 */
  private sonantMarks: number[] = [0x3099, 0x309A];
  /** 通常の濁点・半濁点 */
  private normalSonantMarks: number[] = [0x309B, 0x309C];
  
  /**
   * コンストラクタ
   * 
   * @param clipboardService ClipboardService
   */
  constructor(private clipboardService: ClipboardService) { }

  /** 入力値を変換し結果を表示する */
  public ngDoCheck(): void {
    const output = this.normalizeToNfc(this.input);
    this.output = output;
    
    this.inputCodes = this.toCharCodeArray(this.input);
    this.outputCodes = this.toCharCodeArray(output);
  }
  
  public setExample(): void {
    let codeArray = [];
    
    if(this.example === 0) {
      codeArray = [
        0x304B, 0x3099, 0x304D, 0x3099, 0x304F, 0x3099, 0x3051, 0x3099, 0x3053, 0x3099,
        0x3055, 0x3099, 0x3057, 0x3099, 0x3059, 0x3099, 0x305B, 0x3099, 0x305D, 0x3099,
        0x305F, 0x3099, 0x3061, 0x3099, 0x3064, 0x3099, 0x3066, 0x3099, 0x3068, 0x3099,
        0x306F, 0x3099, 0x3072, 0x3099, 0x3075, 0x3099, 0x3078, 0x3099, 0x307B, 0x3099,
        0x306F, 0x309A, 0x3072, 0x309A, 0x3075, 0x309A, 0x3078, 0x309A, 0x307B, 0x309A,
        0x3046, 0x3099
      ];
    }
    else if(this.example === 1) {
      codeArray = [
        0x30AB, 0x3099, 0x30AD, 0x3099, 0x30AF, 0x3099, 0x30B1, 0x3099, 0x30B3, 0x3099,
        0x30B5, 0x3099, 0x30B7, 0x3099, 0x30B9, 0x3099, 0x30BB, 0x3099, 0x30BD, 0x3099,
        0x30BF, 0x3099, 0x30C1, 0x3099, 0x30C4, 0x3099, 0x30C6, 0x3099, 0x30C8, 0x3099,
        0x30CF, 0x3099, 0x30D2, 0x3099, 0x30D5, 0x3099, 0x30D8, 0x3099, 0x30DB, 0x3099,
        0x30CF, 0x309A, 0x30D2, 0x309A, 0x30D5, 0x309A, 0x30D8, 0x309A, 0x30DB, 0x309A,
        0x30A6, 0x3099
      ];
    }
    else if(this.example === 2) {
      codeArray = [0x3099, 0x30A6, 0x309A];
    }
    else if(this.example === 3) {
      codeArray = [0x309A, 0x3099, 0x309A, 0x3099];
    }
    
    this.input = this.createExampleString(codeArray);
  }
  
  /** 変換結果文字列をコピーする */
  public copy(): void {
    this.clipboardService.copyFromContent(this.output);
  }
  
  /**
   * NFD 文字を NFC に変換する
   * 
   * @param text 文字列
   * @return 引数 text に含まれる NFD 文字を NFC に変換した文字列
   */
  private normalizeToNfc(text: string): string {
    // 1文字ずつ配列に変換する (サロゲートペア文字も1文字1要素になる)
    const srcArray = Array.from(text);
    // 結果を1文字ずつ格納する配列
    const destArray = [];
    
    for(let i = 0; i < srcArray.length; i++) {
      // 現在の文字
      const currentChar = srcArray[i];
      
      // 現在の文字がない場合は終了する
      if(currentChar === undefined) {
        break;
      }
      
      // 次の文字
      const nextChar = srcArray[i + 1];
      
      // 次の文字がないか、次の文字が濁点・半濁点でなければ現在の文字をそのまま結果に格納する
      if(nextChar === undefined || !this.sonantMarks.includes(nextChar.charCodeAt(0))) {
        destArray.push(currentChar);
        continue;
      }
      
      // 次の文字が濁点・半濁点なら、現在の文字と結合できるか調査する
      const unvoicedSoundKanaIndex = this.uncombinedKanaDict.findIndex((kana) => {
        return kana === currentChar.charCodeAt(0);
      });
      
      // 現在の文字が清音の辞書にない文字 (濁点・半濁点と合成できない文字) ならそのまま結果に格納する
      if(unvoicedSoundKanaIndex < 0) {
        destArray.push(currentChar);
        continue;
      }
      
      // 清音の辞書の index 値を利用して濁音の辞書から文字を求め、結果に格納する
      const nfcCurrentChar = String.fromCharCode(this.combinedKanaDict[unvoicedSoundKanaIndex]);
      destArray.push(nfcCurrentChar);
      // 次の文字は濁音・半濁音記号なので、ループ処理を飛ばすよう i をインクリメントする
      i++;
    }
    
    // 単独の NFD 濁点・半濁点を変換する場合
    if(this.isConvertSingleMarks) {
      destArray.forEach((char, index, array) => {
        const sonantMarkIndex = this.sonantMarks.findIndex((sonantMark) => {
          return sonantMark === char.charCodeAt(0);
        });
        
        if(sonantMarkIndex < 0) {
          return;
        }
        
        array[index] = String.fromCharCode(this.normalSonantMarks[sonantMarkIndex]);
      });
    }
    
    // 文字列として結合して返す
    return destArray.join('');
  }
  
  /**
   * 文字列を文字とコードのセットの配列にする
   * 
   * @param text 文字列
   * @return 文字ごとに文字とコードを格納した配列
   */
  private toCharCodeArray(text: string): any[] {
    const radix = 16;
    return Array.from(text).map((char) => {
      return {
        char: char,
        code: `&#x${char.charCodeAt(0).toString(radix)};`
      };
    });
  }
  
  /**
   * コードポイントの配列を文字列に変換する
   * 
   * @param codeArray コードポイントの配列
   * @return 文字列
   */
  private createExampleString(codeArray: number[]): string {
    return codeArray.map((code) => {
      return String.fromCharCode(code);
    }).join('');
  }
}
