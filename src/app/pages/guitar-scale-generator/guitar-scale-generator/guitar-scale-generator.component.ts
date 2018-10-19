// tslint:disable:no-magic-numbers

import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

/**
 * Guitar Scale Generator
 * 
 * ギターのスケール図を描画する
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
      { key: 'dropD'        , name: 'Drop D'         , tuning: [ 4, 11,  7,  2,  9,  2, 11,  7] },
      { key: 'custom'       , name: 'Custom'         , tuning: null                             }
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
        //       Tonic         M2/9          M3     P4/11         P5            M6/13         M7
        //              全            全          半       全            全            全           半
        //       C             D             E      F             G             A             B       (C)
        scale: [ true , false, true , false, true , true , false, true , false, true , false, true  ],
      },
      {
        key: 'naturalMinor',
        name: 'Natural Minor Scale',
        //       Tonic         M2/9   m3/#9         P4/11         P5     m6/b13        m7
        //              全          半       全            全          半       全            全
        //       C             D      Eb            F             G      Ab            Bb             (C)
        scale: [ true , false, true , true , false, true , false, true , true , false, true , false ]
      },
      {
        key: 'harmonicMinor',
        name: 'Harmonic Minor Scale',
        //       Tonic         M2/9   m3/#9         P4/11         P5     m6/b13               M7
        //              全          半       全            全          半       1.5                 半
        //       C             D      Eb            F             G      Ab                   B       (C)
        scale: [ true , false, true , true , false, true , false, true , true , false, false, true  ]
      },
      {
        key: 'melodicMinor',
        name: 'Melodic Minor Scale',
        //       Tonic         M2/9   m3/#9         P4/11         P5            M6/13         M7
        //              全          半       全            全            全            全           半
        //       C             D      Eb            F             G             A             B       (C)
        scale: [ true , false, true , true , false, true , false, true , false, true , false, true  ]
      },
      {
        key: 'majorPentatonic',
        name: 'Major Pentatonic Scale',
        //       Tonic         M2/9          M3                   P5            M6/13
        //              全          全              1.5                  全            1.5
        //       C             D             E                    G             A                     (C)
        scale: [ true , false, true , false, true , false, false, true , false, true , false, false ]
      },
      {
        key: 'minorPentatonic',
        name: 'Minor Pentatonic Scale',
        //       Tonic                m3/#9         P4/11         P5                   m7
        //              1.5                  全            全            1.5                  全
        //       C                    Eb            F             G                    Bb             (C)
        scale: [ true , false, false, true , false, true , false, true , false, false, true , false ]
      },
      {
        key: 'blues',
        name: 'Blues Scale',
        //       Tonic         M2/9   m3/#9  M3     P4/11  b5/#11 P5            M6/13  m7
        //              全          半     半     半     半     半       全          半       全
        //       C             D      Eb     E      F      Gb     G             A      Bb             (C)
        scale: [ true , false, true , true , true , true , true , true , false, true , true , false ],
      },
      {
        key: 'minorBlues',
        name: 'Minor Blues Scale',
        //       Tonic                m3/#9         P4/11  b5/#11 P5                   m7
        //              1.5                  全          半     半       1.5                  全
        //       C                    Eb            F      Gb     G                    Bb             (C)
        scale: [ true , false, false, true , false, true , true , true , false, false, true , false ]
      }
    ]
  };
  
  /** 新規作成するスケール図のフォーム */
  public creatingScaleForm: FormGroup;
  
  /** スケール情報 */
  public scales: any = [];
  
  /** ReactiveForms の各項目が相互に ValueChanges で反応しないよう Subscription を監視する */
  private subscribes: any = {
    strings: null,
    tuningPresetKey: null,
    tuning: null
  };
  
  /**
   * コンストラクタ
   * 
   * @param formBuilder FormBuilder
   */
  constructor(private formBuilder: FormBuilder, private changeDetectorRef: ChangeDetectorRef) { }
  
  /**
   * チューニングの FormArray の Getter
   * 
   * @return FormAray
   */
  get creatingScaleFormTuning(): FormArray {
    return this.creatingScaleForm.get('tuning') as FormArray;
  }
  
  /** 画面初期表示時の処理 */
  public ngOnInit(): void {
    this.creatingScaleForm = this.formBuilder.group({
      isFlat         : [true],
      frets          : [this.constants.frets[2]],
      strings        : [this.constants.strings[0]],
      tuningPresetKey: [this.constants.tuningPresets[0].key],
      tuning         : this.formBuilder.array(Array.from(Array(6)).map((_value, index) => {
        return this.formBuilder.control(this.constants.tuningPresets[0].tuning[index]);
      })),
      keyId          : [this.constants.notes[0].id],
      scaleKey       : [this.constants.scales[0].key]
    });
    // 連携イベントの初期設定
    this.subscribeEventWithout('');
  }
  
  /** 生成処理 */
  public onGenerate(): void {
    /** 結果データ */
    const scale = {
      /** キー名 */
      key: '',
      /** スケール名 */
      name: '',
      /** スケールデータ */
      scale: []
    };
    
    // 選択されたチューニングを取得する
    const selectedTuning = this.creatingScaleFormTuning.value.map((value) => {
      return Number(value);
    });
    
    // 選択されたキーに合わせて音階の配列を用意する
    const selectedNotes = this.detectNotesFromKey(this.creatingScaleForm.value.keyId);
    // 選択されたスケール
    const selectedScale = this.detectScale(this.creatingScaleForm.value.scaleKey);
    // 押さえる音階のみ配列に入れる
    const availableNotes = selectedNotes.filter((_note, index) => {
      return selectedScale.scale[index];
    });
    
    // キー名・スケール名を設定する
    scale.key = selectedNotes[0][this.creatingScaleForm.value.isFlat ? 'flat' : 'sharp'];
    scale.name = selectedScale.name;
    
    // 弦ごとに処理する
    for(let lineIndex = 0; lineIndex < Number(this.creatingScaleForm.value.strings); lineIndex++) {
      /** 1弦のデータ */
      const line = {
        /** 開放弦の音階名 */
        tune : '-',
        /** 押さえるフレットにデータを格納した配列 */
        notes: []
      };
      
      // 開放弦の音階名を求める
      const zeroFretNoteId = selectedTuning[lineIndex];
      const zeroFret = this.constants.notes[zeroFretNoteId];
      const zeroFretNoteName = this.creatingScaleForm.value.isFlat ? zeroFret.flat : zeroFret.sharp;
      line.tune = zeroFretNoteName;
      
      // フレットごとに処理する
      let currentNoteId = zeroFretNoteId;
      for(let fretIndex = 0; fretIndex < (Number(this.creatingScaleForm.value.frets) + 1); fretIndex++) {
        const availableNote = availableNotes.find((note) => {
          return note.id === currentNoteId;
        });
        
        // 押さえる音階なら音階名をセット、そうでなければ空文字をセットする
        line.notes.push(availableNote ? (this.creatingScaleForm.value.isFlat ? availableNote.flat : availableNote.sharp) : '');
        
        // 音階 ID をインクリメントし、12 に達したら 0 に戻す
        currentNoteId++;
        if(currentNoteId >= 12) {
          currentNoteId = 0;
        }
      }
      
      scale.scale.push(line);
    }
    
    this.scales.push(scale);
  }
  
  /**
   * スケールの配列から指定のスケールを削除する
   * 
   * @param index 削除するスケールの添字
   */
  public onRemoveScale(index: number): void {
    this.scales.splice(index, 1);
  }
  
  /** スケールの配列を全削除する */
  public onRemoveAllScales(): void {
    this.scales = [];
  }
  
  /**
   * 指定のプロパティ以外を Subscribe する
   * 
   * @param propertyName Subscribe させないプロパティ名
   */
  private subscribeEventWithout(propertyName: string): void {
    Object.keys(this.subscribes).forEach((key) => {
      // 合致するプロパティ名なら無視する (Subscribe しない)
      if(key === propertyName) {
        return;
      }
      
      // Subscribe 中なら何もしない
      if(this.subscribes[key]) {
        return;
      }
      
      // Subscribe 開始
      if(key === 'strings') {
        // 弦数変更時の処理
        this.subscribes.strings = this.creatingScaleForm.get('strings').valueChanges.subscribe((value) => {
          this.unsubscribeEventWithout('strings');
          this.onChangeStrings(Number(value));
          this.subscribeEventWithout('strings');
        });
      }
      else if(key === 'tuningPresetKey') {
        // チューニングプリセット変更時の処理
        this.subscribes.tuningPresetKey = this.creatingScaleForm.get('tuningPresetKey').valueChanges.subscribe((value) => {
          this.unsubscribeEventWithout('tuningPresetKey');
          this.onChangeTuningPreset(value);
          this.subscribeEventWithout('tuningPresetKey');
        });
      }
      else if(key === 'tuning') {
        // 各弦のチューニング変更時の処理 (弦数の増減にも対応)
        this.subscribes.tuning = this.creatingScaleForm.get('tuning').valueChanges.subscribe((values) => {
          this.unsubscribeEventWithout('tuning');
          this.onChangeTuning(values.map((value) => {
            return Number(value);
          }));
          this.subscribeEventWithout('tuning');
        });
      }
    });
  }
  
  /**
   * 指定のプロパティ以外を Unsubscribe する
   * 
   * @param propertyName Unsubscribe させないプロパティ名
   */
  private unsubscribeEventWithout(propertyName: string): void {
    Object.keys(this.subscribes).forEach((key) => {
      // 合致するプロパティ名なら無視する (Unsubscribe しない)
      if(key === propertyName) {
        return;
      }
      
      // Unsubscribe する
      if(this.subscribes[key]) {
        this.subscribes[key].unsubscribe();
      }
      this.subscribes[key] = null;
    });
  }
  
  /**
   * 弦数変更時、各弦のチューニングの FormArray を更新する
   * 
   * @param strings 選択された弦数
   */
  private onChangeStrings(strings: number): void {
    // 選択されたチューニングプリセットを割り出す
    const tuningPresetKey = this.creatingScaleForm.get('tuningPresetKey').value;
    let selectedTuningPresetTuning = this.detectTuningPresetTuning(tuningPresetKey);
    
    // チューニング定義がない場合 (Custom) は、弦追加時は Standard のプリセットを利用する
    if(!selectedTuningPresetTuning) {
      selectedTuningPresetTuning = this.constants.tuningPresets[0].tuning;
    }
    
    if(this.creatingScaleFormTuning.length > strings) {
      // 減らす
      this.creatingScaleFormTuning.controls.splice(strings);
      return;
    }
    
    // 増やす
    while(this.creatingScaleFormTuning.length < strings) {
      this.creatingScaleFormTuning.push(this.formBuilder.control(selectedTuningPresetTuning[this.creatingScaleFormTuning.length]));
    }
  }
  
  /**
   * チューニングプリセット変更時、各弦のチューニングを変更する
   * 
   * @param tuningPresetKey 選択されたチューニングプリセットのキー
   */
  private onChangeTuningPreset(tuningPresetKey: string): void {
    const selectedTuningPresetTuning = this.detectTuningPresetTuning(tuningPresetKey);
    
    // チューニング定義がない場合は何もしない (Custom)
    if(!selectedTuningPresetTuning) {
      return;
    }
    
    // 各弦のフォームにチューニング定義を設定していく
    this.creatingScaleFormTuning.controls.forEach((control, index) => {
      control.setValue(selectedTuningPresetTuning[index]);
    });
  }
  
  /**
   * 各弦のチューニング変更時、チューニングプリセットの値を変更する
   * 
   * @param tuning 各弦の選択されたチューニング
   */
  private onChangeTuning(tuning: number[]): void {
    // チューニング定数から、選択されたチューニングに合致するプリセットがあるか探し出す
    const selectedTuningPreset = this.constants.tuningPresets.find((tuningPreset) => {
      // チューニング定義がない場合 (Custom) は不一致扱い
      if(!tuningPreset.tuning) {
        return false;
      }
      
      // 選択されたチューニングごとに定数と比較する
      return tuning.every((tune, index) => {
        return tune === tuningPreset.tuning[index];
      });
    });
    
    // チューニングプリセットが見つかり、チューニング定義があればそのキーを、なければ Custom に変更する
    this.creatingScaleForm.get('tuningPresetKey')
      .setValue((selectedTuningPreset && selectedTuningPreset.tuning) ? selectedTuningPreset.key : 'custom');
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
   * @return 選択されたスケールのデータ
   */
  private detectScale(selectedScaleKey: string): any {
    const selectedScale = this.constants.scales.find((scale) => {
      return scale.key === selectedScaleKey;
    });
    
    if(!selectedScale) {
      throw new Error('該当するスケール情報なし');
    }
    
    return selectedScale;
  }
}
