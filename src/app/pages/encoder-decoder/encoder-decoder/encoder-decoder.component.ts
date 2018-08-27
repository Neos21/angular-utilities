import { Component } from '@angular/core';

/**
 * Encoder Decoder
 * 
 * 色々エンコードしたりデコードしたりする。
 */
@Component({
  selector: 'app-encoder-decoder',
  templateUrl: './encoder-decoder.component.html',
  styleUrls: ['./encoder-decoder.component.scss']
})
export class EncoderDecoderComponent {
  /** 入力値 */
  public input: string = '';
  
  /** エンコーダ・デコーダの配列 */
  public executors: any[] = [
    {
      title: 'encode / decode URIComponent',
      description: 'URI エンコード・デコード',
      encode: (input) => {
        return encodeURIComponent(input);
      },
      decode: (input) => {
        return decodeURIComponent(input);
      },
      encoded: '',
      decoded: ''
    },
    {
      title: 'encode / decode URI',
      description: 'URI エンコード・デコード。スラッシュなどをエスケープする',
      encode: (input) => {
        return encodeURI(input);
      },
      decode: (input) => {
        return decodeURI(input);
      },
      encoded: '',
      decoded: ''
    },
    {
      title: 'escape / unescape (%u)',
      description: '%u Unicode 形式 (例 : %u3042 ⇔ あ)',
      encode: (input) => {
        return escape(input);
      },
      decode: (input) => {
        return unescape(input);
      },
      encoded: '',
      decoded: ''
    },
    {
      title: 'escape / unescape (\\u)',
      description: '\\u Unicode 形式 (例 : \\u3042 ⇔ あ)',
      encode: (input) => {
        // 参考 : https://mothereff.in/js-escapes
        return escape(input).replace(/%u/gi, '\\u');
      },
      decode: (input) => {
        return unescape(input.replace(/\\u/gi, '%u'));
      },
      encoded: '',
      decoded: ''
    },
    {
      title: 'escape / unescape (U+)',
      description: 'U+  Unicode 形式 (例 : U+3042 ⇔ あ)',
      encode: (input) => {
        return escape(input).replace(/%u/gi, 'U+');
      },
      decode: (input) => {
        return unescape(input.replace(/U\+/gi, '%u'));
      },
      encoded: '',
      decoded: ''
    },
    {
      title: '10進数数値文字参照',
      description: '10進数の数値文字参照 (例 : &#12354; ⇔ あ)',
      encode: (input) => {
        // 参考 : http://ochikochi.com/tool/character/
        const radix = 10;
        return Array.prototype.reduce.call(input, (prevStr, _currentStr, index) => {
          return `${prevStr}&#${input.charCodeAt(index).toString(radix)};`;
        }, '');
      },
      decode: (input) => {
        return input.replace(/&#([0-9]+);/gi, (_matched, subMatch) => {
          return String.fromCharCode(subMatch);
        });
      },
      encoded: '',
      decoded: ''
    },
    {
      title: '16進数数値文字参照',
      description: '16進数の数値文字参照 (例 : &#x3042; ⇔ あ)',
      encode: (input) => {
        const radix = 16;
        return Array.prototype.reduce.call(input, (prevStr, _currentStr, index) => {
          return `${prevStr}&#x${input.charCodeAt(index).toString(radix)};`;
        }, '');
      },
      decode: (input) => {
        // 参考 : http://mizuame.sakura.ne.jp/blog_sample/js/tgConvNumCharRefs/
        return input.replace(/&#x([0-9a-f]+);/gi, (_matched, subMatch) => {
          return String.fromCharCode(+`0x${subMatch}`);
        });
      },
      encoded: '',
      decoded: ''
    }
  ];
  
  /**
   * エンコード・デコードを実行する
   */
  public exec(): void {
    this.executors.forEach((executor) => {
      try {
        executor.encoded = executor.encode(this.input);
      }
      catch(error) {
        executor.encoded = `エンコード失敗 :\n${error}`;
      }
      
      try {
        executor.decoded = executor.decode(this.input);
      }
      catch(error) {
        executor.decoded = `デコード失敗 :\n${error}`;
      }
    });
  }
}
