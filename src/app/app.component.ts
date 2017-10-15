import { Component, OnInit } from '@angular/core';

/**
 * App root component
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  /** CoinHive mining status */
  isWorking = false;

  /** CoinHive miner */
  protected miner;

  /**
   * ngOnInit
   */
  ngOnInit(): void {
    if(!(window as any).CoinHive) {
      console.log('ngOnInit() : CoinHive does not exist.');
      return;
    }

    console.log('ngOnInit() : Setup CoinHive miner.');
    this.miner = new (window as any).CoinHive.User('jbVDoIh3MSdKF3wdHzSBu4pGM1mpI4sR', 'angular-utilities', {
      autoThreads: true,  // experimental
      throttle: 0.4       // 0 = 100% working
    });
  }

  /**
   * Start mining
   */
  start(): void {
    if(!this.miner) {
      console.log('start() : CoinHive miner does not exist.');
      return;
    }

    if(this.isWorking) {
      console.log('start() : The miner is already working. Stop the miner...');
      this.stop();
    }

    console.log('start() : Start mining.');
    this.miner.start();
    this.isWorking = true;
  }

  /**
   * Stop mining
   */
  stop(): void {
    if(!this.miner) {
      console.log('stop() : CoinHive miner does not exist.');
      return;
    }

    if(!this.isWorking) {
      console.log('stop() : The miner is not working.');
      this.isWorking = false;
      return;
    }

    console.log('stop() : Stop mining.');
    this.miner.stop();
    this.isWorking = false;
  }
}
