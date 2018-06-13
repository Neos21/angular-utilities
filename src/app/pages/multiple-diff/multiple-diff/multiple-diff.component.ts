import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-multiple-diff',
  templateUrl: './multiple-diff.component.html',
  styleUrls: ['./multiple-diff.component.scss']
})
export class MultipleDiffComponent implements OnInit {
  public texts: any[] = [
    {
      name: 'a.txt',
      raw: `a
{
  "name": "project-a",
  "version": "0.0.1",
  "dependencies": {
    "@neos21/neos21": "0.0.0"
  }
}`
    },
    {
      name: 'b.txt',
      raw: `{
  "private": true,
  "name": "project-b",
  "version": "0.0.1",
{
  "dependencies": {
    "@neos21/ccc": "0.0.1",
    "@neos21/neos21": "0.0.0"
  }
}`
    },
    {
      name: 'c.txt',
      raw: `{
  "private": true,
  "name": "project-c",
  "version": "0.0.2",
  "dependencies": {
    "@neos21/neos21": "0.0.0"
  }
}`
    }
  ];

  ngOnInit(): void {
    this.diff();
  }
  
  public diff(): void {
    this.texts.forEach((text) => {
      text.diffed = undefined;
    });
    
    this.texts.forEach((text, index) => {
      if(index !== this.texts.length - 1) {
        this.setDiffFlags(index, index + 1);
      }
    });
    
    this.group();
  }
  
  protected setDiffFlags(aIndex: number, bIndex: number): void {
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
          // 差分なしの行同士がどれだけ離れているかを保存する
          aLine.offsetNext = aLine.rawIndex - bLine.rawIndex;
          bLine.offsetPrev = bLine.rawIndex - aLine.rawIndex;
          isSearched = true;
        }
      });
    });
    
    // A の方は既に比較されている場合があるので Diff 結果をマージすべきか確認する
    this.setDiffed(aIndex, aLines);
    this.setDiffed(bIndex, bLines);
  }
  
  /**
   * this.texts.raw を基に Diff 用のデータを生成する
   * 生テキストを行ごとの配列にし、初期状態では text に行テキスト、rawIndex に元の行数を入れている
   * 
   * @param index 対象の this.texts の添字
   */
  protected getLines(index: number): any[] {
    return this.texts[index].raw.split('\n').map((line, lineIndex) => {
      return { text: line, rawIndex: lineIndex };
    });
  }
  
  /**
   * Diff 結果をセットする。適宜マージする
   * 
   * @param index 対象の this.texts の添字
   * @param diffed セットしたい Diff 結果データ
   */
  protected setDiffed(index: number, diffed: any[]): void {
    if(this.texts[index].diffed === undefined) {
      // 未定義の場合は直接今回の Diff 結果をセットする
      this.texts[index].diffed = diffed;
    }
    else {
      // 過去の Diff 結果と今回の Diff 結果をマージする
      this.texts[index].diffed.forEach((line, lineIndex) => {
        Object.assign(line, diffed[lineIndex]);
      });
    }
  }
  
  protected group(): void {
    const offsetLine = { isOffsetLine: true };
    
    const diffedList = this.texts.map((text) => {
      return text.diffed;
    });
    
    // 先に group プロパティを作っておく
    this.texts.forEach((text) => {
      text.group = [];
    });
    
    // 1ファイル操作
    diffedList.forEach((diffed, diffedIndex) => {
      const group = this.texts[diffedIndex].group;
      
      const sameLines = diffed.filter((line) => {
        return line.isDiffPrev === false || line.isDiffNext === false;
      });
      
      // group に同じ行の配列を入れる
      sameLines.forEach((sameLine) => {
        group.push([sameLine]);
      });
      
      // この時点で group の先頭の配列に、1行目でないデータが入っている場合は、group の先頭にデータを追加する
      if(group[0] && group[0][0] && group[0][0].isOffsetLine === undefined && group[0][0].rawIndex !== 0) {
        console.log(this.texts[diffedIndex].name, '1行目でない', group[0][0]);
        group.unshift([diffed[0]]);
        // 同様に別のグループの先頭に空行を入れる
        this.texts.forEach((text, textIndex) => {
          if(textIndex === diffedIndex) {
            return;
          }
          
          if(text.group.length === 0) {
            text.group.push([offsetLine]);
          }
        });
      }
      
      // 行を挿入する group の添字
      let currentGroupIndex = 0;
      diffed.forEach((line, lineIndex) => {
        // グループのその添字の配列を取得する
        const currentGroup = group[currentGroupIndex];
        // 挿入する行が、配列の最初の要素と同じデータの場合は、同一行があるグループなので挿入しない
        if(Object.is(line, currentGroup[0])) {
          return;
        }
        
        // 挿入する行が、次のグループの配列の最初の要素と同じだった場合は、挿入先となる添字をインクリメントし、その行は挿入せず終わる
        const nextGroup = group[currentGroupIndex + 1];
        if(nextGroup && Object.is(line, nextGroup[0])) {
          currentGroupIndex++;
          return;
        }
        
      });
      
      console.log('終わり', group);
    });
    
  }
  
  /*
  protected group(): void {
    const offsetObj = { isOffset: true };
    
    const diffedList = this.texts.map((text) => {
      return text.diffed;
    });
    
    // オフセット位置に空のオフセット行データを入れる
    const includedOffsetList = [];
    diffedList.forEach((diffed, index) => {
      const includedOffset = [];
      diffed.forEach((line) => {
        // 手前に差分があるようならオフセット行データを入れる
        if((line.offsetNext !== undefined && line.offsetNext < 0) || (line.offsetPrev !== undefined && line.offsetPrev < 0)) {
          includedOffset.push(offsetObj);
        }
        // 元の行データを入れる
        includedOffset.push(line);
      });
      includedOffsetList.push(includedOffset);
    });
    
    // テスト
    this.texts.forEach((text, index) => {
      text.includedOffset = includedOffsetList[index];
    });
    
    // オフセット行データの登場ごとに配列化する
    includedOffsetList.forEach((includedOffset, includedOffsetIndex) => {
      const groups = [];
      
      // 1ファイルの操作
      includedOffset.forEach((line, lineIndex) => {
        // 行ごとの処理
        if(lineIndex === 0) {
          console.log('1行目 → グループ作成');
          groups.push([]);
        }
        
        if(line.isOffset) {
          console.log('オフセット行 → グループ作成');
          groups.push([]);
          
          return;
        }
        
        groups[groups.length - 1].push(line);
      });
      
      console.log(this.texts[includedOffsetIndex].name, groups);
    });
  }
  */
}

/*

diffedList.forEach((diffed, index) => {
  const includedOffset = [];
  let countOffsetNext = 0;
  let countOffsetPrev = 0;
  
  diffed.forEach((line) => {
    if(line.offsetNext !== undefined && line.offsetNext < 0) {
      const absOffset = Math.abs(line.offsetNext) - countOffsetNext;
      for (let i = 0; i < absOffset; i++) {
        includedOffset.push(offsetLine);
        countOffsetNext++;
      }
    }
    else if(line.offsetPrev !== undefined && line.offsetPrev < 0) {
      const absOffset = Math.abs(line.offsetPrev) - countOffsetPrev;
      for (let i = 0; i < absOffset; i++) {
        includedOffset.push(offsetLine);
        countOffsetPrev++;
      }
    }
    
    includedOffset.push(line);
  });
  
  this.texts[index].includedOffset = includedOffset;
});

 */
