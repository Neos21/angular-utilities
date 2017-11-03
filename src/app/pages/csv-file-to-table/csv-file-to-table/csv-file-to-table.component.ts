import { Component } from '@angular/core';

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
  /**
   * パース後のテーブルデータ
   */
  public tableData: Array<string> = [];
  
  /**
   * ドラッグ & ドロップエリアにファイルがドラッグされた時のイベント
   * ドラッグイベントを解除しておかないとドロップ時のイベント解除だけでは足りない
   * 
   * @param event イベント
   */
  onDragOver(event: any): void {
    // dragover イベント時に preventDefault() しておかないと、ブラウザがファイルを開こうとしてしまう
    // stopPropagation() は不要な様子
    event.preventDefault();
  }
  
  /**
   * ドラッグ & ドロップエリアにファイルがドロップされた時のイベント
   * 
   * @param event イベント
   */
  onDrop(event: any): void {
    // ファイルドロップ時の処理を中断
    event.preventDefault();
    
    this.parseFile(event.dataTransfer.files[0]);
  }
  
  /**
   * input[type="file"] からファイルを選択した時のイベント
   * 
   * @param event イベント
   */
  onSelectFile(event: any): void {
    this.parseFile(event.target.files[0]);
  }
  
  /**
   * ファイルをパースする
   * 
   * @param file ファイル
   */
  private parseFile(file: File): void {
    if(file.type !== 'text/csv') {
      alert('CSV ファイルを選択してください');
      
      return;
    }
    
    // ファイルリーダーを用意する
    const reader = new FileReader();
    
    // ファイルを読み込んだらテーブルデータとして分割しセットする
    reader.onload = () => {
      const rows = reader.result.split('\n');
      rows.forEach((row) => {
        this.tableData.push(row.split(','));
      });
    };
    
    // ファイル読み込みを実行する
    reader.readAsText(file);
  }
}
