import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';

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
    console.log('CoinHiveService#constructor()');
    
    this.isWorking = false;
    this.createMiner();
  }
  
  /**
   * 採掘を開始する
   */
  start(): void {
    console.log('CoinHiveService#start()');
    
    if(!this.miner) {
      console.log('  マイナー未生成・再生成試行');
      this.createMiner();
    }
    else if(this.isWorking) {
      console.log('  採掘開始済・一旦停止する');
      this.stop();
    }
    
    if(environment.production) {
      console.log('  採掘開始');
      this.miner.start();
    }
    else {
      console.log('  採掘開始 : 開発モードのため採掘未実行');
    }
    this.isWorking = true;
  }
  
  /**
   * 採掘を終了する
   */
  stop(): void {
    console.log('CoinHiveService#stop()');
    
    if(!this.miner) {
      console.log('  マイナー未生成のため終了');
      this.isWorking = false;
      
      return;
    }
    else if(!this.isWorking) {
      console.log('  採掘停止済のため終了');
      this.isWorking = false;
      
      return;
    }
    
    if(environment.production) {
      console.log('  採掘停止');
      this.miner.stop();
    }
    else {
      console.log('  採掘停止 : 開発モードのため採掘未実行');
    }
    this.isWorking = false;
  }
  
  /**
   * マイナーを生成する
   */
  private createMiner(): void {
    console.log('CoinHiveService#createMiner()');
    
    if(!(window as any).CoinHive) {
      console.log('  CoinHive が読み込まれていないようなので初期化を中断する');
      
      return;
    }
    else if(this.miner) {
      console.log('  マイナー生成済のため生成成功として終了する');
      
      return;
    }
    
    console.log('  マイナーを生成する');
    this.miner = new (window as any).CoinHive.User('jbVDoIh3MSdKF3wdHzSBu4pGM1mpI4sR', 'angular-utilities', {
      autoThreads: true,
      throttle: 0.4  // 0 = 100% 稼働
    });
  }
}
