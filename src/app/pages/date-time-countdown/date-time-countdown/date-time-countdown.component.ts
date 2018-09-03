// tslint:disable:no-magic-numbers

import { Component, OnDestroy, OnInit } from '@angular/core';

import * as moment from 'moment';
import { interval, Subscription } from 'rxjs';

/**
 * Date Time Countdown
 * 
 * 現在日時と指定日時を比較してカウントダウン表示する。
 */
@Component({
  selector: 'app-date-time-countdown',
  templateUrl: './date-time-countdown.component.html',
  styleUrls: ['./date-time-countdown.component.scss']
})
export class DateTimeCountdownComponent implements OnInit, OnDestroy {
  /** 現在日時 (表示専用) */
  public current: any = {
    moment: null,
    year: '',
    month: '',
    date: '',
    hour: '',
    minute: '',
    second: ''
  };
  /** 指定日時 : 入出力 */
  public target: any = {
    moment: null,
    year: '',
    month: '',
    date: '',
    hour: '',
    minute: '',
    second: ''
  };
  /** 差分表示 */
  public duration: any = {
    years: '',
    months: '',
    days: '',
    hours: '',
    minutes: '',
    seconds: ''
  };
  
  /** タイマー */
  private timer: Subscription;
  
  /** 初期表示時の処理 */
  public ngOnInit(): void {
    // 現在日時を控えて画面に設定する
    this.updateCurrent();
    // 指定日時のデフォルトを控えて画面に設定する
    this.target.moment = moment().add(7, 'days');
    this.target.year   = this.target.moment.year();
    this.target.month  = this.zeroPad(this.target.moment.month() + 1);
    this.target.date   = this.zeroPad(this.target.moment.date());
    this.target.hour   = this.zeroPad(this.target.moment.hour());
    this.target.minute = this.zeroPad(this.target.moment.minute());
    this.target.second = this.zeroPad(this.target.moment.second());
    // 間隔を取得する
    this.calcDuration();
    
    // タイマーを設定する
    this.timer = interval(1000).subscribe(() => {
      this.updateCurrent();
      this.calcDuration();
    });
  }
  
  /** 画面遷移時の処理 : タイマーを止める */
  public ngOnDestroy(): void {
    if(this.timer) {
      this.timer.unsubscribe();
    }
  }
  
  /** 指定日時の変更に合わせて処理する */
  public onInputTarget(): void {
    // 未入力があれば無視する
    if(Object.keys(this.target).some((property) => {
      return (this.target[property] === undefined || this.target[property] === null || this.target[property] === '');
    })) {
      return;
    }
    
    // Moment を生成する
    const targetMoment = moment({
      year  : Number(this.target.year),
      month : Number(this.target.month - 1),
      date  : Number(this.target.date),
      hour  : Number(this.target.hour),
      minute: Number(this.target.minute),
      second: Number(this.target.second)
    });
    
    // 不正な値なら直前の入力値のままにする
    if(!targetMoment.isValid()) {
      return;
    }
    
    // 指定日時を控えて差を計算する
    this.target.moment = targetMoment;
    this.calcDuration();
  }
  
  /**
   * Blur 時に対象のプロパティの値を 0 パディングする
   * 
   * @param propertyName プロパティ名
   */
  public onZeroPad(propertyName: string): void {
    if(this.target[propertyName] !== undefined && this.target[propertyName] !== '') {
      this.target[propertyName] = this.zeroPad(this.target[propertyName]);
    }
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
   
  /** 現在日時を控えて画面に設定する */
  private updateCurrent(): void {
    this.current.moment = moment();
    this.current.year   = this.current.moment.year();
    this.current.month  = this.zeroPad(this.current.moment.month() + 1);
    this.current.date   = this.zeroPad(this.current.moment.date());
    this.current.hour   = this.zeroPad(this.current.moment.hour());
    this.current.minute = this.zeroPad(this.current.moment.minute());
    this.current.second = this.zeroPad(this.current.moment.second());
  }
  
  /** 差を計算して画面に表示する */
  private calcDuration(): void {
    // https://stackoverflow.com/questions/16129157/countdown-timer-using-moment-js/16129331#16129331
    let durationTime = this.target.moment.valueOf() - this.current.moment.valueOf();
    // 指定日時の方が未来日なら true にする
    this.duration.isAfter = (durationTime <= 0);
    
    // 指定日時の方が過去日なら入れ替える
    if(this.duration.isAfter) {      
      durationTime = this.current.moment.valueOf() - this.target.moment.valueOf();
    }
    
    // スペースでパディングする
    const duration = moment.duration(durationTime);
    this.duration.years   = `    ${duration.years()}`.slice(-4);
    this.duration.months  = `  ${duration.months()}`.slice(-2);
    this.duration.days    = `  ${duration.days()}`.slice(-2);
    this.duration.hours   = `  ${duration.hours()}`.slice(-2);
    this.duration.minutes = `  ${duration.minutes()}`.slice(-2);
    this.duration.seconds = `  ${duration.seconds()}`.slice(-2);
  }
}
