import { Component } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

/**
 * CSV File To Table
 * 
 * CSV ファイルを読み込み HTML テーブル形式で出力する。
 * ファイルをドラッグ & ドロップで読み込むエリアと input[type="file"] のエリアを設けた。
 */
@Component({
  selector: 'app-csv-file-to-table',
  templateUrl: './csv-file-to-table.component.html',
  styleUrls: ['./csv-file-to-table.component.scss']
})
export class CsvFileToTableComponent {
  /** パース後のテーブルデータ */
  public tableData: string[][] = [];
  /** サンプル CSV ファイルの URL (ダウンロード用) */
  public exampleFileUrl: SafeUrl = '';
  
  /**
   * コンストラクタ
   * 
   * @param domSanitizer サニタイザ
   */
  constructor(private domSanitizer: DomSanitizer) {}
  
  /**
   * サンプル CSV ファイルを生成してダウンロードさせる
   * 
   * - 参考 :
   *   - https://qiita.com/wadahiro/items/eb50ac6bbe2e18cf8813
   *   - https://blog.makotoishida.com/2017/06/angularpdf.html
   */
  public onDownloadExampleFile(): void {
    // tslint:disable-next-line:no-magic-numbers
    const bom = new Uint8Array([0xEF, 0xBB, 0xBF]);
    const content = '見出しA,見出しB,見出しC\nデータA1,データB1,データC1\nデータA2,データB2,データC2';
    const blob = new Blob([bom, content], { type: 'text/csv' });
    if(window.navigator.msSaveBlob) {
      window.navigator.msSaveBlob(blob, 'example.csv');
    }
    else {
      this.exampleFileUrl = this.domSanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(blob));
    }
  }
  
  /**
   * ドラッグ & ドロップエリアにファイルがドラッグされた時のイベント
   * ドラッグイベントを解除しておかないとドロップ時のイベント解除だけでは足りない
   * 
   * @param event イベント
   */
  public onDragOver(event: any): void {
    // dragover イベント時に preventDefault() しておかないと、ブラウザがファイルを開こうとしてしまう
    // stopPropagation() は不要な様子
    event.preventDefault();
  }
  
  /**
   * ドラッグ & ドロップエリアにファイルがドロップされた時のイベント
   * 
   * @param event イベント
   */
  public onDrop(event: any): void {
    // ファイルドロップ時の処理を中断
    event.preventDefault();
    
    this.parseFile(event.dataTransfer.files[0]);
  }
  
  /**
   * input[type="file"] からファイルを選択した時のイベント
   * 
   * @param event イベント
   */
  public onSelectFile(event: any): void {
    this.parseFile(event.target.files[0]);
  }
  
  /**
   * ファイルをパースする
   * 
   * @param file ファイル
   */
  private parseFile(file: File): void {
    this.tableData = [];
    
    if(file.type !== 'text/csv') {
      alert(`CSV ファイルを選択してください (${file.type})`);
      
      return;
    }
    
    // ファイルリーダーを用意する
    const reader = new FileReader();
    
    // ファイルを読み込んだらテーブルデータとして分割しセットする
    reader.onload = () => {
      const rows = (reader.result as string).split('\n');
      this.tableData = rows.map((row) => {
        return row.split(',');
      });
    };
    
    // ファイル読み込みを実行する
    reader.readAsText(file);
  }
}
