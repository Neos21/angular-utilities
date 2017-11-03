import { Component, OnDestroy, OnInit } from '@angular/core';

import { environment } from '../../../../environments/environment';

import { CoinHiveConstants } from '../../../shared/constants/coin-hive.constants';
import { CoinHiveService } from '../../../shared/services/coin-hive.service';

/**
 * Coin Hive の動作状況を管理するコンポーネント
 */
@Component({
  selector: 'app-coin-hive-manager',
  templateUrl: './coin-hive-manager.component.html',
  styleUrls: ['./coin-hive-manager.component.scss']
})
export class CoinHiveManagerComponent implements OnInit, OnDestroy {
  /**
   * 現在のスレッド数
   * 
   * デフォルト値は CoinHive が navigator.hardwareConcurrency の値 (論理スレッド数) で決める
   */
  public currentThreads: number = 0;
  
  /**
   * 現在の稼働率
   * 
   * デフォルト値は CoinHiveService で決めた採掘開始時の値になる
   * Throttle 値とは逆になる (Throttle 値は 0 が 100% 稼働・1 が 0% 稼働)
   */
  public currentSpeed: number = 0;
  
  /**
   * 現在の1秒あたりの採掘ハッシュ
   */
  public hashesPerSecond: number = 0;
  
  /**
   * このセッションの累計採掘ハッシュ
   */
  public hashesTotal: number = 0;
  
  /**
   * 採掘ハッシュ数のグラフ表示用リスト
   * ハッシュ数を百分率に直した値を保持する
   */
  public hashGraphList: number[];
  
  /**
   * 採掘ハッシュ数のリスト
   * ハッシュ数をそのまま保持する
   */
  private hashList: number[];
  
  /**
   * 採掘ハッシュ数のグラフの高さ (px)
   */
  private hashGraphHeight: number = 100;
  
  /**
   * setInterval の処理を保持する
   */
  private interval: any;
  
  /**
   * コンストラクタ
   * 
   * @param coinHiveService CoinHive の採掘開始・終了を管理するサービス
   */
  constructor(private coinHiveService: CoinHiveService) {
    // 予め10件のデータを入れておく
    const hashListSize = 10;
    this.hashList = this.hashGraphList = Array(hashListSize).fill(0);
  }
  
  /**
   * 初期処理
   */
  ngOnInit(): void {
    // CoinHive がないか開発モードなら何もしない
    if(!(window as any).CoinHive || !this.coinHiveService.miner || !environment.production) {
      return;
    }
    
    // 定期処理を開始する
    const interval = 1000;
    this.interval = setInterval(this.updateStates.bind(this), interval);
    
    // スレッド数・稼働率を取得する
    this.currentThreads = this.coinHiveService.miner.getNumThreads();
    this.currentSpeed = this.getSpeedFromThrottle(this.coinHiveService.miner.getThrottle());
  }
  
  /**
   * 画面遷移時の処理
   * 定期処理を終了する
   */
  ngOnDestroy(): void {
    if(this.interval) {
      clearInterval(this.interval);
    }
  }
  
  /**
   * スレッド数を 1 増やす
   */
  onAddThreads(): void {
    this.coinHiveService.miner.setNumThreads(this.coinHiveService.miner.getNumThreads() + 1);
    this.currentThreads = this.coinHiveService.miner.getNumThreads();
  }
  
  /**
   * スレッド数を 1 減らす
   * 1 より少なくならないようにする
   */
  onRemoveThreads(): void {
    this.coinHiveService.miner.setNumThreads(Math.max(1, this.coinHiveService.miner.getNumThreads() - 1));
    this.currentThreads = this.coinHiveService.miner.getNumThreads();
  }
  
  /**
   * 稼働率 (Speed) を 10% 上げる
   * 0 = 100% より上がらないようにする
   */
  onSpeedUp(): void {
    const minus = 0.1;
    const throttle = Math.max(0, this.coinHiveService.miner.getThrottle() - minus);    
    this.coinHiveService.miner.setThrottle(throttle);
    this.currentSpeed = this.getSpeedFromThrottle(throttle);
  }
  
  /**
   * 稼働率 (Speed) を 10% 下げる
   * 一定の稼働率より下げないようにする
   */
  onSpeedDown(): void {
    const plus = 0.1;
    const throttle = Math.min(CoinHiveConstants.minThrottle, this.coinHiveService.miner.getThrottle() + plus);
    this.coinHiveService.miner.setThrottle(throttle);
    this.currentSpeed = this.getSpeedFromThrottle(throttle);
  }
  
  /**
   * 現在の採掘ハッシュ数を取得し画面表示を更新する
   */
  private updateStates(): void {
    // ステータス表示を更新する
    const hashesPerSecond = this.coinHiveService.miner.getHashesPerSecond().toFixed(0);
    this.hashesPerSecond = hashesPerSecond;
    this.hashesTotal     = this.coinHiveService.miner.getTotalHashes(true);
    
    // 先頭の要素を削除し10件に保つ
    this.hashList.shift();
    // 現在の値を追加する
    this.hashList.push(hashesPerSecond);
    
    // 基準とする最大値を探す
    const maxValue = Math.max(...this.hashList);
    // グラフ表示用の高さを割り当てる
    this.hashGraphList = this.hashList.map((hash) => {
      return Number(((hash / maxValue) * this.hashGraphHeight || 0).toFixed(0));
    });
  }
  
  /**
   * Throttle 値から稼働率を得る
   * 
   * ex. throttle : 0.3 の場合、稼働率 70 (%) を返す
   * 
   * @param throttle Throttle 値
   */
  private getSpeedFromThrottle(throttle: number): number {
    const percent = 100;
    
    return Math.round((1 - throttle) * percent);
  }
}
