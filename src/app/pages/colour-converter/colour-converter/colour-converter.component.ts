// tslint:disable:no-magic-numbers

import { Component, DoCheck, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn } from '@angular/forms';

import * as ccc from '@neos21/ccc';

/**
 * Colour Converter
 * 
 * なんかめっちゃイマイチな感じになってしもうた…
 */
@Component({
  selector: 'app-colour-converter',
  templateUrl: './colour-converter.component.html',
  styleUrls: ['./colour-converter.component.scss']
})
export class ColourConverterComponent implements OnInit, DoCheck {
  /** フォーム */
  public colourForm: FormGroup;
  /** 操作中の FormControl 名 */
  public editingFormControlName: string = '';
  
  /**
   * コンストラクタ
   * 
   * @param formBuilder FormBuilder
   */
  constructor(private formBuilder: FormBuilder) { }
  
  /** 初期処理 */
  public ngOnInit(): void {
    this.colourForm = this.formBuilder.group({
      colourCode: ['', colourCodeValidator()],
      red: ['', decimalCodeValidator()],
      green: ['', decimalCodeValidator()],
      blue: ['', decimalCodeValidator()]
    });
  }
  
  /** 相互変換 */
  public ngDoCheck(): void {
    if(!this.editingFormControlName) {
      return;
    }
    
    if(this.editingFormControlName === 'colourCode') {
      if(this.colourForm.get('colourCode').value !== '' && this.colourForm.get('colourCode').valid) {
        const result = ccc(this.colourForm.get('colourCode').value);
        if(result && result.length === 3) {
          this.colourForm.get('red').setValue(result[0]);
          this.colourForm.get('green').setValue(result[1]);
          this.colourForm.get('blue').setValue(result[2]);
        }
      }
    }
    else if(this.colourForm.get('red').value !== null && this.colourForm.get('red').valid
      && this.colourForm.get('green').value !== null && this.colourForm.get('green').valid
      && this.colourForm.get('blue').value !== null && this.colourForm.get('blue').valid) {
      const result = ccc([this.colourForm.get('red').value, this.colourForm.get('green').value, this.colourForm.get('blue').value]);
      if(result !== null) {
        this.colourForm.get('colourCode').setValue(result);
      }
    }
  }
  
  /**
   * フォーカスした FormControl 名を控える
   * 
   * @param formControlName フォーカスした FormControl 名
   */
  public onFocus(formControlName: string): void {
    this.editingFormControlName = formControlName;
  }
  
  /** フォーカス中の FormControl 情報を消す */
  public onBlur(): void {
    this.editingFormControlName = '';
  }
}

/**
 * 未入力か、カラーコードの書式のみ許容するバリデータ
 */
function colourCodeValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if(control.value === undefined || control.value === null || control.value === '') {
      return null;
    }
    
    let value = control.value;
    
    if(value.startsWith('#')) {
      value = value.slice(1);
    }
    
    if((value.length === 3 || value.length === 6)
       && value === value.replace(/[^0-9a-f]/g, '')) {
      return null;
    }
    
    return { hasInvalidValue: true };
  };
}

/**
 * 未入力か、0 から 255 までの整数のみ許容するバリデータ
 */
function decimalCodeValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if(control.value === undefined || control.value === null || control.value === ''
       || (/^\d*$/.test(control.value) && Number(control.value) <= 255)) {
      return null;
    }
    
    return { hasInvalidValue: true };
  };
}
