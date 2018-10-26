import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import * as exampleUserModel from './example-user-model.json';

/**
 * Dynamic Generate Form
 * 
 * モデルとして定義した JSON 情報からフォームを動的に生成する。
 */
@Component({
  selector: 'app-dynamic-generate-form',
  templateUrl: './dynamic-generate-form.component.html',
  styleUrls: ['./dynamic-generate-form.component.scss']
})
export class DynamicGenerateFormComponent implements OnInit {
  /** 動的生成するフォーム */
  public dynamicForm: FormGroup;
  /** 生成対象のモデル情報 */
  public dynamicFormModel: any = undefined;
  /** モデルの編集欄 */
  public model: string = '';
  /** this.dynamicForm.value のプレビュー欄 */
  public preview: string = '';
  
  /**
   * コンストラクタ
   * 
   * @param formBuilder FormBuilder
   */
  constructor(private formBuilder: FormBuilder) {}
  
  /** 初期表示時の処理 */
  public ngOnInit(): void {
    // JSON の整形
    const defaultModel = exampleUserModel;
    this.model = JSON.stringify(defaultModel.default, null, '  ');
    // this.model を利用しフォームを生成する
    this.onGenerateForm();
  }
  
  /** this.model をオブジェクトに変換し、入力チェック後フォームを生成する */
  public onGenerateForm(): void {
    let modelObj;
    try {
      modelObj = JSON.parse(this.model);
    }
    catch(error) {
      console.error('JSON パース失敗', error);
      return;
    }
    
    if(!this.validateModel(modelObj)) {
      console.error('モデル不正');
      return;
    }
    
    this.buildForm(modelObj);
  }
  
  /** データ確認 */
  public onPreview(): void {
    this.preview = JSON.stringify(this.dynamicForm.value, null, '  ');
  }
  
  /**
   * モデルの入力値チェック
   * 
   * @param model モデル
   * @return エラーがなければ true、1つでもエラーがあれば false
   */
  protected validateModel(model: any): boolean {
    if(!model.name || !model.label || !model.controls || !model.controls.length) {
      console.error('トップレベルの必須プロパティなし');
      return false;
    }
    
    let isValid = true;
    model.controls.forEach((control) => {
      // 空文字を許容しない
      if(!control.name || !control.label || !control.type) {
        console.error('要素の必須プロパティなし');
        isValid = false;
        return;
      }
      
      if(!['textbox', 'textarea', 'selectbox', 'radio', 'checkbox'].includes(control.type)) {
        console.error('Type 不正', control.type);
        isValid = false;
        return;
      }
      
      if(['selectbox', 'radio', 'checkbox'].includes(control.type)) {
        if(!control.options || !control.options.length) {
          console.error('options プロパティなし', control.type);
          isValid = false;
          return;
        }
        
        control.options.forEach((option) => {
          // value 値の空欄を許容する
          if(option.value === undefined || !option.label) {
            console.error('options 各要素の必須プロパティなし', control.label);
            isValid = false;
            return;
          }
        });
      }
    });
    
    return isValid;
  }
  
  /**
   * モデルからフォームを生成し設定する
   * 
   * @param model モデル
   */
  protected buildForm(model: any): void {
    // ['control-name', FormControl or FormArray] な要素を格納していく
    const formGroupProperties = [];
    model.controls.forEach((control) => {
      if(control.type === 'checkbox') {
        // チェックボックスの場合 : FormArray を構築する
        const formControls = control.options.map((option) => {
          const formControl = this.formBuilder.control(!!option.checked);
          if(option.disabled) {
            formControl.disable();
          }
          
          return formControl;
        });
        const formArray = this.formBuilder.array(formControls);
        formGroupProperties.push([control.name, formArray]);
      }
      else {
        // それ以外 : FormControl を作成・設定する
        const formControl = this.formBuilder.control(control.initialValue || '');
        if(control.disabled) {
          formControl.disable();
        }
      
        formGroupProperties.push([control.name, formControl]);
      }
    });
    
    // フォームを設定する
    const formGroup = {};
    formGroupProperties.forEach((formGroupProperty) => {
      formGroup[formGroupProperty[0]] = formGroupProperty[1];
    });
    this.dynamicForm = this.formBuilder.group(formGroup);
    
    // モデルを設定する
    this.dynamicFormModel = model;
    // プレビューをリセットする
    this.preview = '';
  }
}
