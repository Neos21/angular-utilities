import { Component, DoCheck, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn } from '@angular/forms';

/**
 * Calculator
 */
@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit, DoCheck {
  /** 入力フォーム */
  public calcForm: FormGroup;
  /** 計算結果が表示できないエラーの場合に true にする */
  public hasError: boolean = false;
  
  /**
   * コンストラクタ
   * 
   * @param formBuilder FormBuilder
   */
  constructor(private formBuilder: FormBuilder) { }

  /** 期表示時の処理 : フォームを生成する */
  public ngOnInit(): void {
    this.calcForm = this.formBuilder.group({
      input: ['', numberValidator()],
      transformed: [''],
      output: ['']
    });
  }
  
  /** 入力チェック後、eval() で計算させる */
  public ngDoCheck(): void {
    if(this.calcForm.get('input').value.trim() === '') {
      this.calcForm.get('transformed').setValue('');
      this.calcForm.get('output').setValue('');
      this.hasError = false;
      
      return;
    }
    else if(this.calcForm.get('input').invalid) {
      this.calcForm.get('transformed').setValue('');
      this.calcForm.get('output').setValue('許容不可文字が入力されています');
      this.hasError = true;
      
      return;
    }
    
    try {
      const transformed = this.calcForm.get('input').value
        .replace(/[,，]/g, '')  // カンマは除去する
        .replace(/[０-９]/g, (str) => {
          // tslint:disable-next-line:no-magic-numbers
          return String.fromCharCode(str.charCodeAt(0) - 65248);
        })
        .replace(/．/g, '.')
        .replace(/（/g, '(')
        .replace(/）/g, ')')
        .replace(/＋/g, '+')
        .replace(/[−‐]/g, '-')
        .replace(/×/g, '*')
        .replace(/[÷／]/g, '/');
      this.calcForm.get('transformed').setValue(transformed);
      
      // tslint:disable-next-line:no-eval
      const result = `${eval(transformed)}`;
      if(result.match('Infinity') || result.match('NaN')) {
        throw new Error(result);
      }
      this.calcForm.get('output').setValue(result);
      this.hasError = false;
    }
    catch(error) {
      this.calcForm.get('output').setValue(`計算式変換に失敗しました … ${error}`);
      this.hasError = true;
    }
  }
}

/**
 * 数値関連の文字のみ許容するバリデータ
 */
function numberValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if(control.value === undefined || control.value === null || control.value.trim() === '') {
      return null;
    }
    
    // 数値 (\d)、四則演算記号、ピリオドとカンマ、カッコ、全角の諸々、スペース類 (全角スペース含)
    return control.value.match(/[^\d\+\-\*\/\.\,\(\)０-９＋−‐×÷／．，（）\s]/) ? { hasInvalidValue: true } : null;
  };
}
