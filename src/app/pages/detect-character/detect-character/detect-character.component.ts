import { Component, DoCheck } from '@angular/core';

/**
 * Detect Character
 * 
 * 似たような文字を区別する。
 */
@Component({
  selector: 'app-detect-character',
  templateUrl: './detect-character.component.html',
  styleUrls: ['./detect-character.component.scss']
})
export class DetectCharacterComponent implements DoCheck {
  /** 入力値 */
  public input: string = '';
  /** 結果 */
  public output: any[] = [];
  
  /** 紛らわしい文字の辞書 */
  public dictionary: any[] = [
    // { char: ' ' , ref: '', isHalf: true , description: '' },
    // { char: '  ', ref: '', isHalf: false, description: '' },
    // 縦棒関連
    { char: '1' , ref: '&#x31;'  , isHalf: true , description: '数字 いち (壱)' },
    { char: '１', ref: '&#xff11;', isHalf: false, description: '数字 いち (壱)' },
    { char: 'l' , ref: '&#x6c;'  , isHalf: true , description: '英小文字 エル (L)' },
    { char: 'ｌ', ref: '&#xff4c;', isHalf: false, description: '英小文字 エル (L)' },
    { char: '|' , ref: '&#x7c;'  , isHalf: true , description: 'バーティカルバー (縦線)' },
    { char: '｜', ref: '&#xff5c;', isHalf: false, description: 'バーティカルバー (縦線)' },
    // 横棒関連
    { char: '一', ref: '&#x4e00;', isHalf: false, description: '漢数字 いち (壱)' },
    { char: 'ｰ' , ref: '&#xff70;', isHalf: true , description: '長音' },
    { char: 'ー', ref: '&#x30fc;', isHalf: false, description: '長音' },
    { char: '-' , ref: '&#x2d;'  , isHalf: true , description: 'ハイフンマイナス' },
    { char: '－', ref: '&#xff0d;', isHalf: false, description: 'ハイフンマイナス' },
    { char: '‐', ref: '&#x2010;', isHalf: false, description: 'ハイフン' },
    { char: '−' , ref: '&#x2212;', isHalf: true , description: 'マイナス' },  // &minus; 全角と判断されるかも
    { char: '‒' , ref: '&#x2012;', isHalf: true , description: 'フィギュアダッシュ' },
    { char: '–' , ref: '&#x2013;', isHalf: true , description: 'En Dash 二分ダッシュ' },
    { char: '—' , ref: '&#x2014;', isHalf: true , description: 'Em Dash 全角ダッシュ' },
    { char: '―', ref: '&#x2015;', isHalf: false, description: 'Horizontal Bar' },
    { char: '─', ref: '&#x2500;', isHalf: false, description: '罫線' },
    { char: '━', ref: '&#x2501;', isHalf: false, description: '太い罫線' },
    // 波線関連
    { char: '⁓' , ref: '&#x2053;', isHalf: true , description: 'Swung ダッシュ' },
    { char: '〜', ref: '&#x301c;', isHalf: false, description: 'Wave 波ダッシュ' },
    { char: '~' , ref: '&#x7e;'  , isHalf: true , description: 'チルダ' },
    { char: '～', ref: '&#xff5e;', isHalf: false, description: 'チルダ' },
    { char: '˜' , ref: '&#x2dc;' , isHalf: true , description: 'Small Tilde' },  // &tilde;
    // シャープ関連
    { char: '#' , ref: '&#x23;'  , isHalf: true , description: '番号記号 (いげた)' },
    { char: '＃', ref: '&#xff03;', isHalf: false, description: '番号記号 (いげた)' },
    { char: '♯', ref: '&#x266f;', isHalf: false, description: 'シャープ' },
    // 丸関連
    { char: 'o' , ref: '&#x6f;'  , isHalf: true , description: '英小文字 オー' },
    { char: 'ｏ', ref: '&#xff4f;', isHalf: false, description: '英小文字 オー' },
    { char: 'O' , ref: '&#x4f;'  , isHalf: true , description: '英大文字 オー' },
    { char: 'Ｏ', ref: '&#xff2f;', isHalf: false, description: '英大文字 オー' },
    { char: '0' , ref: '&#x30;'  , isHalf: true , description: '数字 ぜろ (零)' },
    { char: '０', ref: '&#xff10;', isHalf: false, description: '数字 ぜろ (零)' },
    { char: '〇', ref: '&#x3007;', isHalf: false, description: '漢数字 ぜろ (零)' },
    { char: '○', ref: '&#x25cb;', isHalf: false, description: '丸' },
    { char: '◯', ref: '&#x25ef;', isHalf: false, description: '大きな丸' },
    { char: '゚'  , ref: '&#x309a;', isHalf: true , description: '半濁点' },  // Mac だと前後の文字とくっついて表示されてしまう
    { char: '゜', ref: '&#x309c;', isHalf: false, description: '半濁点' },
    { char: '｡' , ref: '&#xff61;', isHalf: true , description: '句点' },
    { char: '。', ref: '&#x3002;', isHalf: false, description: '句点' },
    // 二本線関連
    { char: '=' , ref: '&#x3d;'  , isHalf: true , description: 'イコール' },
    { char: '＝', ref: '&#xff1d;', isHalf: false, description: 'イコール' },
    { char: 'ニ', ref: '&#x30cb;', isHalf: false, description: 'カタカナ に' },
    { char: 'ﾆ' , ref: '&#xff86;', isHalf: true , description: 'カタカナ に' },
    { char: 'ニ', ref: '&#x30cb;', isHalf: false, description: 'カタカナ に' },
    { char: '二', ref: '&#x4e8c;', isHalf: false, description: '漢数字 に (弐)' },
    // か関連
    { char: 'ｶ' , ref: '&#xff76;', isHalf: true , description: 'カタカナ か' },
    { char: 'カ', ref: '&#x30ab;', isHalf: false, description: 'カタカナ か' },
    { char: 'ヵ', ref: '&#x30f5;', isHalf: false, description: 'カタカナ 小さい か' },
    { char: '力', ref: '&#x529b;', isHalf: false, description: '漢字 ちから' },
    // た関連
    { char: 'ﾀ' , ref: '&#xff80;', isHalf: true , description: 'カタカナ た' },
    { char: 'タ', ref: '&#x30bf;', isHalf: false, description: 'カタカナ た' },
    { char: '夕', ref: '&#x5915;', isHalf: false, description: '漢字 ゆう' },
    // 四角関連
    { char: 'ﾛ' , ref: '&#xff9b;', isHalf: true , description: 'カタカナ ろ' },
    { char: 'ロ', ref: '&#x30ed;', isHalf: false, description: 'カタカナ ろ' },
    { char: '口', ref: '&#x53e3;', isHalf: false, description: '漢字 くち' },
    { char: '□', ref: '&#x25a1;', isHalf: false, description: '四角' },
  ].map((item) => {
    // 全角か半角かの文言を追加する
    item.description = `${item.isHalf ? '半' : '全'}角 ${item.description}`;
    return item;
  });
  
  /* 辞書の整合性チェック用
  constructor() {
    const radix = 16;
    this.dictionary.forEach((item) => {
      if(`&#x${item.char.charCodeAt(0).toString(radix)};` !== item.ref) {
        console.log('文字を数値参照にすると ref と異なる値になった', item.char);
      }
      if(String.fromCharCode(+`0x${item.ref.replace(/&#x/, '').replace(/;/g, '')}`) !== item.char) {
        console.log('数値参照を文字にすると char と異なる値になった', item.char);
      }
    });
  }
   */
  
  /** テキスト入力ごとに処理する */
  public ngDoCheck(): void {
    // 1文字ずつ検証し結果を配列にして設定する
    this.output = Array.from(this.input).map((char) => {
      const dictItem = this.dictionary.find((item) => {
        return item.char === char;
      });
      return {
        char: char,
        description: dictItem ? dictItem.description : '',
        ref: dictItem ? dictItem.ref : ''
      };
    });
  }
}
