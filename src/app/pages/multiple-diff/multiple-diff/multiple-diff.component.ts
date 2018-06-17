import { Component, OnInit } from '@angular/core';

/**
 * Multiple Diff
 * 
 * 3ファイル以上比較できる。
 */
@Component({
  selector: 'app-multiple-diff',
  templateUrl: './multiple-diff.component.html',
  styleUrls: ['./multiple-diff.component.scss']
})
export class MultipleDiffComponent implements OnInit {
  /** 比較するデータ群 */
  public texts: any[] = [];
  
  /** 初期表示時の処理 */
  public ngOnInit(): void {
    this.dummy();
  }
  
  /** 空の列を追加する */
  public addColumn(): void {
    this.texts.push({
      name: '',
      raw: '',
      scrollLeft: 0
    });
    this.execDiff();
  }
  
  /** ダミーデータをセットする */
  public dummy(): void {
    const dummy = [
      {
        name: 'project-a/package.json',
        raw: `{
  "name": "project-a",
  "version": "0.0.1",
  "dependencies": {
    "@neos21/neos21": "0.0.0"
  }
}`,
        scrollLeft: 0
      },
      {
        name: 'project-b/package.json',
        raw: `{
  "name": "project-b",
  "version": "0.0.1",
  "private": true,
  "dependencies": {
    "@neos21/ccc": "0.0.1",
    "@neos21/neos21": "0.0.0"
  }
}`,
        scrollLeft: 0
      },
      {
        name: 'project-c/package.json',
        raw: `{
  "name": "project-c",
  "version": "0.0.2",
  "private": true,
  "dependencies": {
    "@neos21/neos21": "0.0.0"
  }
}`,
        scrollLeft: 0
      }
    ];
    
    this.texts = dummy;
    this.execDiff();
  }
  
  /** 全削除する : デフォルトで2列作成 */
  public removeAll(): void {
    this.texts = [
      { name: '', raw: '' },
      { name: '', raw: '' }
    ];
  }
  
  /** 指定の列を削除する */
  public removeColumn(index: number): void {
    this.texts.splice(index, 1);
    this.execDiff();
  }
  
  /** ファイルを読み込む */
  public loadFile(event: Event, index: number): void {
    // ファイルがない場合は何もしない
    if(!event || !event.target || !event.target['files'] || !event.target['files'].length) {
      // ファイルアップロード欄をリセットする
      this.texts[index].file = true;
      setTimeout(() => {
        this.texts[index].file = false;
      }, 1);
      
      return;
    }
    
    const file = event.target['files'][0];
    
    // テキストでないファイルを除外する
    // 「text を含む」で判定すると .md ファイル (type なし) や .json (application/json) などが除外されてしまうため明らかに NG なファイルのみ除外する
    if(/image/.test(file.type) || /video/.test(file.type)) {
      alert('テキスト形式のファイルを選択してください');
      // ファイルアップロード欄をリセットする
      this.texts[index].file = true;
      setTimeout(() => {
        this.texts[index].file = false;
      }, 1);
      
      return;
    }
    
    // ファイルリーダを用意する
    const reader = new FileReader();
    // ファイルを読み込んだらデータをセットする
    reader.onload = () => {
      this.texts[index].name = file.name;
      this.texts[index].raw = reader.result;
      this.execDiff();
      // ファイルアップロード欄をリセットする
      this.texts[index].file = true;
      setTimeout(() => {
        this.texts[index].file = false;
      }, 1);
    };
    // ファイル読み込みを実行する
    reader.readAsText(file);
  }
  
  /** プレビューを横スクロールした時にカラーリング要素の配置を調整するため、横スクロール位置を控える */
  public onScrollView(event: Event, index: number): void {
    if(!event || !event.target || event.target['scrollLeft'] === undefined) {
      return;
    }
    
    this.texts[index].scrollLeft = event.target['scrollLeft'];
  }
  
  /** Diff を実行する */
  public execDiff(): void {
    // Diff 結果をリセットする
    this.texts.forEach((text) => {
      text.diffResult = undefined;
    });
    // Diff を実行する
    this.texts.forEach((text, index) => {
      this.diff(index);
    });
  }
  
  /**
   * 行ごとに比較する
   * 
   * @param aIndex ベースにするデータの添字
   */
  private diff(aIndex: number): void {
    // 比較対象のデータの添字
    let bIndex = aIndex + 1;
    
    // 比較対象の添字が this.texts の範囲を超えている場合は先頭と比較する
    if(bIndex === this.texts.length) {
      bIndex = 0;
    }
    
    // 対象のデータを取得する
    const aLines = this.getLines(aIndex);
    const bLines = this.getLines(bIndex);
    
    // A をベースに B に同じ行がないか探索していく
    aLines.forEach((aLine) => {
      // B と差分があるか否かフラグ
      aLine.isDiffNext = true;
      // B との比較済
      let isSearched = false;
      
      bLines.forEach((bLine) => {
        // A と差分があるか否かフラグ・未定義なら初期値を設定する
        if(bLine.isDiffPrev === undefined) {
          bLine.isDiffPrev = true;
        }
        
        // 検索未済で、B がまだ同じ行と判定されておらず、A と B の行が同じなら印を付ける
        if (!isSearched && bLine.isDiffPrev && aLine.text === bLine.text) {
          // A から見た B・B から見た A でともに差分なしと設定する
          aLine.isDiffNext = bLine.isDiffPrev = false;
          // 差分なしの行同士がどれだけ離れているかを保存する (今のところ用途なし)
          aLine.offsetNext = aLine.rawIndex - bLine.rawIndex;
          bLine.offsetPrev = bLine.rawIndex - aLine.rawIndex;
          // 検索済とする
          isSearched = true;
        }
      });
    });
    
    // Diff 結果をマージしながら設定する
    this.setDiffResult(aIndex, aLines);
    this.setDiffResult(bIndex, bLines);
  }
  
  /**
   * this.texts.raw を基に Diff 用のデータを生成する
   * 生テキストを行ごとの配列にし、初期状態では text に行テキスト、rawIndex に元の行数を入れている
   * 
   * @param index 対象の this.texts の添字
   */
  private getLines(index: number): any[] {
    return this.texts[index].raw.split('\n').map((line, lineIndex) => {
      return { text: line, rawIndex: lineIndex };
    });
  }
  
  /**
   * Diff 結果をセットする。適宜マージする
   * 
   * @param index 対象の this.texts の添字
   * @param diffResult セットしたい Diff 結果データ
   */
  private setDiffResult(index: number, diffResult: any[]): void {
    if(this.texts[index].diffResult === undefined) {
      // 未定義の場合は直接今回の Diff 結果をセットする
      this.texts[index].diffResult = diffResult;
    }
    else {
      // 過去の Diff 結果と今回の Diff 結果をマージする
      this.texts[index].diffResult.forEach((line, lineIndex) => {
        Object.assign(line, diffResult[lineIndex]);
      });
    }
  }
}
