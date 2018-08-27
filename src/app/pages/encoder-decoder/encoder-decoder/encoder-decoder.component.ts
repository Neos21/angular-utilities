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
      encoded: '',
      decode: (input) => {
        return decodeURIComponent(input);
      },
      decoded: ''
    },
    {
      title: 'encode / decode URI',
      description: 'URI エンコード・デコード。スラッシュなどをエスケープする',
      encode: (input) => {
        return encodeURI(input);
      },
      encoded: '',
      decode: (input) => {
        return decodeURI(input);
      },
      decoded: ''
    },
    {
      title: 'escape / unescape (%u)',
      description: 'Unicode 形式 (%u) でエンコード・デコード',
      encode: (input) => {
        return escape(input);
      },
      encoded: '',
      decode: (input) => {
        return unescape(input);
      },
      decoded: ''
    },
    {
      title: 'escape / unescape (\\u)',
      description: 'Unicode 形式 (\\u) でエンコード・デコード',
      encode: (input) => {
        return escape(input).replace(/%u/g, '\\u');
      },
      encoded: '',
      decode: (input) => {
        return unescape(input.replace(/\\U/g, '%u').replace(/\\u/g, '%u'));
      },
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
