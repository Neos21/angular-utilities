import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { CoinHiveService } from '../services/coin-hive.service';

/**
 * CoinHive 採掘状況を確認する Guard
 */
@Injectable()
export class AcceptGuard implements CanActivate {
  /**
   * コンストラクタ
   * 
   * @param router Index に遷移させる際に使用する
   * @param coinHiveService CoinHive サービス
   */
  constructor(private router: Router, private coinHiveService: CoinHiveService) {}
  
  /**
   * CoinHive の採掘が開始されていなければ Index に遷移させる
   * 
   * @param _next ActivatedRouteSnapshot
   * @param _state RouterStateSnapshot
   */
  canActivate(
    _next: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
      console.log(`AcceptGuard#canActivate() : ${this.coinHiveService.isWorking}`);
      if(this.coinHiveService.isWorking) {
        return true;
      }
      else {
        this.router.navigate(['/index']);
        
        return false;
      }
  }
}
