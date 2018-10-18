// tslint:disable:no-magic-numbers

import { Component, OnInit } from '@angular/core';

/**
 * Guitar Scale Generator
 * 
 * ギターのスケール図を描画する
 * 
 * - TODO : 複数のスケールを配置し、追加・削除できるようにしたい
 * - TODO : スケール図の弦ごとに、チューニングを後から変更できるようにしたい
 */
@Component({
  selector: 'app-guitar-scale-generator',
  templateUrl: './guitar-scale-generator.component.html',
  styleUrls: ['./guitar-scale-generator.component.scss']
})
export class GuitarScaleGeneratorComponent implements OnInit {
  /** 定数 */
  public constants: any = {
    /** フレット数 */
    frets: [21, 22, 24, 27],
    /** 弦数 */
    strings: [6, 7, 8],
    /** チューニングプリセット : tuning は1弦からの開放弦を notes.id で示す (8弦分まで用意) */
    tuningPresets: [
      { key: 'standard'     , name: 'Standard'       , tuning: [ 4, 11,  7,  2,  9,  4, 11,  7] },
      { key: 'halfStepDown' , name: 'Half Step Down' , tuning: [ 3, 10,  6,  1,  8,  3, 10,  6] },
      { key: 'wholeStepDown', name: 'Whole Step Down', tuning: [ 2,  9,  5,  0,  7,  2,  9,  5] },
      { key: 'dropD'        , name: 'Drop D'         , tuning: [ 4, 11,  7,  2,  9,  2, 11,  7] }
    ],
    /** 音階名定義 :  */
    notes: [
      { id:  0, flat: 'C' , sharp: 'C'  },
      { id:  1, flat: 'Db', sharp: 'C#' },
      { id:  2, flat: 'D' , sharp: 'D'  },
      { id:  3, flat: 'Eb', sharp: 'D#' },
      { id:  4, flat: 'E' , sharp: 'E'  },
      { id:  5, flat: 'F' , sharp: 'F'  },
      { id:  6, flat: 'Gb', sharp: 'F#' },
      { id:  7, flat: 'G' , sharp: 'G'  },
      { id:  8, flat: 'Ab', sharp: 'G#' },
      { id:  9, flat: 'A' , sharp: 'A'  },
      { id: 10, flat: 'Bb', sharp: 'A#' },
      { id: 11, flat: 'B' , sharp: 'B'  }
    ],
    /** スケール定義 */
    scales: [
      {
        key: 'major',
        name: 'Major Scale',
        //              全            全          半       全            全            全           半
        //       C             D             E      F             G             A             B       (C)
        scale: [ true , false, true , false, true , true , false, true , false, true , false, true  ],
      },
      {
        key: 'minor',
        name: 'Minor Scale',
        //              全          半       全            全          半       全            全    半
        //       C             D      Eb            F             G      Ab            Bb             (C)
        scale: [ true , false, true , true , false, true , false, true , true , false, true , false ]
      }
    ]
  };
  
  /** 選択内容 */
  public selected: any = {
    isFlat         : true,
    frets          : this.constants.frets[2],
    strings        : this.constants.strings[0],
    tuningPresetKey: this.constants.tuningPresets[0].key,
    keyId          : this.constants.notes[0].id,
    scaleKey       : this.constants.scales[0].key
  };
  
  /** スケール情報 */
  public output: any = null;
  
  /** 画面初期表示時の処理 */
  public ngOnInit(): void {
    this.onGenerate();
  }
  
  /** 生成処理 */
  public onGenerate(): void {
    /** 結果データ */
    const output = [];
    
    // 選択されたチューニングの開放弦情報を得る : 開放弦の音階名を求めるため
    const selectedTuningPreset = this.detectTuningPresetTuning(this.selected.tuningPresetKey);
    
    // 選択されたキーに合わせて音階の配列を用意する
    const selectedNotes = this.detectNotesFromKey(this.selected.keyId);
    // 選択されたスケール
    const selectedScale = this.detectScale(this.selected.scaleKey);
    
    // 押さえる音階のみ配列に入れる
    const availableNotes = selectedNotes.filter((_note, index) => {
      return selectedScale[index];
    });
    
    // 弦ごとに処理する
    for(let lineIndex = 0; lineIndex < Number(this.selected.strings); lineIndex++) {
      /** 1弦のデータ */
      const line = {
        /** 開放弦の音階名 */
        tune : '-',
        /** 押さえるフレットにデータを格納した配列 */
        notes: []
      };
      
      // 開放弦の音階名を求める
      const zeroFretNoteId = selectedTuningPreset[lineIndex];
      const zeroFret = this.constants.notes[zeroFretNoteId];
      const zeroFretNoteName = this.selected.isFlat ? zeroFret.flat : zeroFret.sharp;
      line.tune = zeroFretNoteName;
      
      // フレットごとに処理する
      let currentNoteId = zeroFretNoteId;
      for(let fretIndex = 0; fretIndex < (Number(this.selected.frets) + 1); fretIndex++) {
        const availableNote = availableNotes.find((note) => {
          return note.id === currentNoteId;
        });
        
        if(!availableNote) {
          line.notes.push('');
        }
        else {
          line.notes.push(this.selected.isFlat ? availableNote.flat : availableNote.sharp);
        }
        
        // 音階 ID をインクリメントし、12 に達したら 0 に戻す
        currentNoteId++;
        if(currentNoteId >= 12) {
          currentNoteId = 0;
        }
      }
      
      output.push(line);
    }
    
    this.output = output;
  }
  
  /**
   * 選択されたチューニングプリセットのチューニング配列を取得する
   * 
   * @param selectedTuningPresetKey 選択されたチューニングプリセットのキー
   * @return 選択されたチューニングプリセットのチューニング配列
   */
  private detectTuningPresetTuning(selectedTuningPresetKey: string): number[] {
    const selectedTuningPreset = this.constants.tuningPresets.find((tuningPreset) => {
      return tuningPreset.key === selectedTuningPresetKey;
    });
    
    if(!selectedTuningPreset) {
      throw new Error('該当するチューニングプリセットなし');
    }
    
    return selectedTuningPreset.tuning;
  }
  
  /**
   * 指定のルート音から始まる音階の配列を生成する
   * 
   * @param selectedKeyId 音階の ID
   * @return 指定の音階の ID をルート音に始まる配列
   */
  private detectNotesFromKey(selectedKeyId: number): any[] {
    // 配列の定数を複製する
    const srcNotes = this.constants.notes.concat();
    // ルート音から始まる配列を作る (0番目の要素の id === selectedKeyId になる)
    const notes = [];
    // 音階の ID は配列の添字として使えるので、まずその添字以降の要素を取り出して追加する
    notes.push(...srcNotes.splice(selectedKeyId));
    // 末尾に、その添字までの要素を取り出して結合する
    notes.push(...srcNotes.splice(0, selectedKeyId));
    
    return notes;
  }
  
  /**
   * 選択されたスケールの配列を取得する
   * 
   * @param selectedScaleKey 選択されたスケールのキー
   * @return 選択されたスケールの配列
   */
  private detectScale(selectedScaleKey: string): boolean[] {
    const selectedScale = this.constants.scales.find((scale) => {
      return scale.key === selectedScaleKey;
    });
    
    if(!selectedScale) {
      throw new Error('該当するスケール情報なし');
    }
    
    return selectedScale.scale;
  }
}
