// tslint:disable:no-magic-numbers

import { Component } from '@angular/core';

import * as moment from 'moment';

/**
 * Epoch Time Converter
 */
@Component({
  selector: 'app-epoch-time-converter',
  templateUrl: './epoch-time-converter.component.html',
  styleUrls: ['./epoch-time-converter.component.scss']
})
export class EpochTimeConverterComponent {
  /** UNIX 時間 */
  public unix: string = '';
  
  /** 年 */
  public year: string = '';
  /** 月 */
  public month: string = '';
  /** 日 */
  public date: string = '';
  /** 時 */
  public hour: string = '00';
  /** 分 */
  public minute: string = '00';
  /** 秒 */
  public second: string = '00';

  /**
   * UNIX 時間を UTC に変換する
   */
  public toUtc(): void {
    if(!this.isValidNumber(this.unix)) {
      this.year = this.month = this.date = '';
      this.hour = this.minute = this.second = '00';
      
      return;
    }
    
    const result = moment.unix(Number(this.unix)).utc();
    this.year   = String(result.year());
    this.month  = this.zeroPad(result.month() + 1);
    this.date   = this.zeroPad(result.date());
    this.hour   = this.zeroPad(result.hour());
    this.minute = this.zeroPad(result.minute());
    this.second = this.zeroPad(result.second());
  }
  
  public toUnix(): void {
    if(!this.isValidNumber(this.year) || !this.isValidNumber(this.month) || !this.isValidNumber(this.date)
       || !this.isValidNumber(this.hour) || !this.isValidNumber(this.minute) || !this.isValidNumber(this.second)) {
      this.unix = '';
      
      return;
    }
    
    const result = moment.utc()
      .year(Number(this.year))
      .month(Number(this.month) - 1)
      .date(Number(this.date))
      .hour(Number(this.hour))
      .minute(Number(this.minute))
      .second(Number(this.second))
      .millisecond(0);
    this.unix = String(result.unix());
  }
  
  /**
   * Blur 時に対象のプロパティの値を 0 パディングする
   * 
   * @param propertyName プロパティ名
   */
  public onZeroPad(propertyName: string): void {
    if(this[propertyName] !== undefined && this[propertyName] !== '') {
      this[propertyName] = this.zeroPad(this[propertyName]);
    }
  }
  
  /**
   * 空文字でなく、数値のみの値かどうか検証する
   * 
   * @param value 値
   * @return 空文字でなく、数値のみなら true
   */
  private isValidNumber(value: string): boolean {
    return value !== '' && /^\d*$/.test(value);
  }
  
  /**
   * ゼロパディングする
   * 
   * @param value ゼロパディングしたい値
   * @return ゼロパディングした値
   */
  private zeroPad(value: string | number): string {
    return `0${value}`.slice(-2);
  }
}
