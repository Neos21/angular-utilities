import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { CoinHiveService } from '../../../shared/services/coin-hive.service';

/**
 * Index コンポーネント
 * 
 * 起動時に表示させるトップページ。
 * ユーザに CoinHive 採掘を行う承認を得る画面を表示する。
 * 承認されれば採掘を開始し Home に移動する。
 * 採掘状況は CoinHiveService が管理しており、Home 以降のページは採掘中でないと遷移できないよう AcceptGuard がガードしている。
 */
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent {
  /**
   * コンストラクタ
   * 
   * @param router Home に遷移させる際に使用する
   * @param coinHiveService CoinHive サービス
   */
  constructor(private router: Router, private coinHiveService: CoinHiveService) {}
  
  /**
   * 「承認」ボタン押下時
   * 
   * CoinHive 採掘を開始し、Home に移動する
   */
  accept(): void {
    this.coinHiveService.start();
    this.router.navigate(['/home']);
  }
}
