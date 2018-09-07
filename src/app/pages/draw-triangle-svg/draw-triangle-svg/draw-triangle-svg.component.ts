import { Component, DoCheck, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

/**
 * Draw Triangle SVG
 * 
 * SVG で三角形を描画する。
 */
@Component({
  selector: 'app-draw-triangle-svg',
  templateUrl: './draw-triangle-svg.component.html',
  styleUrls: ['./draw-triangle-svg.component.scss']
})
export class DrawTriangleSvgComponent implements OnInit, DoCheck {
  /** 入力フォーム */
  public triangleForm: FormGroup;
  /** 三角形の結果 */
  public triangle: any;
  /** ベース幅 */
  public width: number = 200;
    
  /**
   * コンストラクタ
   * 
   * @param formBuilder FormBuilder
   */
  constructor(private formBuilder: FormBuilder) {
    this.resetTriangle();
  }
  
  /** 初期表示時の処理 */
  public ngOnInit(): void {
    this.triangleForm = this.formBuilder.group({
      sideA: [''],
      sideB: [''],
      sideC: ['']
    });
  }
  
  /** 値変更時の処理 */
  public ngDoCheck(): void {
    const sideA = parseFloat(this.triangleForm.value.sideA);
    const sideB = parseFloat(this.triangleForm.value.sideB);
    const sideC = parseFloat(this.triangleForm.value.sideC);
    
    // 三角形にならない場合は結果をリセットする
    if(!this.isTriangle(sideA, sideB, sideC)) {
      this.resetTriangle();
      return;
    }
    
    // 三角形を描画する
    this.drawTriangle(sideA, sideB, sideC);
  }
  
  /**
   * 結果情報をリセットする
   */
  private resetTriangle(): void {
    this.triangle = {
      sideA: null,
      sideB: null,
      sideC: null,
      type: '',
      peakX: null,
      peakY: null,
      points: ''
    };
  }
  
  /**
   * 三角形が作れるかどうか判定する
   * 
   * 三角形が作れる条件は、最も長い棒の長さ < 他の2本の棒の長さ
   * 
   * @param sideA 辺 A
   * @param sideB 辺 B
   * @param sideC 辺 C
   * @return 三角形が作れれば true
   */
  private isTriangle(sideA: number, sideB: number, sideC: number): boolean {
    return (sideA < sideB + sideC) && (sideB < sideA + sideC) && (sideC < sideA + sideB);
  }
  
  /**
   * 三角形を描画する
   * 
   * @param sideA 辺 A
   * @param sideB 辺 B
   * @param sideC 辺 C
   */
  private drawTriangle(sideA: number, sideB: number, sideC: number): void {
    // 三辺の値を大きいものから順に並べる
    const sides = [sideA, sideB, sideC].sort((a, b) => {
      return b - a;
    });
    
    // tslint:disable:no-magic-numbers binary-expression-operand-order
    const scale = this.width / (sides[0]);
    const peakX: any = (
      scale * sides[1] * Math.sin(
        Math.PI / 2 - Math.acos(
          (Math.pow(sides[0], 2) + Math.pow(sides[1], 2) - Math.pow(sides[2], 2)) / (2 * sides[0] * sides[1])
        )
      )
    ).toFixed(1);
    const peakY = (scale * Math.sqrt(Math.pow(sides[1], 2) - Math.pow(peakX / scale, 2))).toFixed(1);
    // tslint:enable:no-magic-numbers binary-expression-operand-order
    
    this.triangle.sideA = sideA;
    this.triangle.sideB = sideB;
    this.triangle.sideC = sideC;
    this.triangle.type = this.detectType(sideA, sideB, sideC);
    this.triangle.peakX = peakX;
    this.triangle.peakY = peakY;
    this.triangle.points = `0,0 ${this.width},0 ${peakX},${peakY}`;
  }
  
  /**
   * 三角形の種類を求める
   * 
   * @param sideA 辺 A
   * @param sideB 辺 B
   * @param sideC 辺 C
   * @return 三角形の種類
   */
  private detectType(sideA: number, sideB: number, sideC: number): string {
    if((sideA === sideB) && (sideB === sideC)) {
      return '正';
    }
    
    if((sideA === sideB) || (sideB === sideC) || (sideC === sideA)) {
      return '二等辺';
    }
    
    return '不等辺';
  }
}
