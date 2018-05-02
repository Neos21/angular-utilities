import { Component, Inject, Renderer } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';

import { environment } from '../environments/environment';

/**
 * アプリのルートコンポーネント
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  /** サイドメニュー .menu の表示状況を管理するフラグ */
  public isShownMenu: boolean = false;
  
  /**
   * コンストラクタ
   * 
   * @param router 画面遷移を検知するために使用する
   * @param renderer body 要素に class を付与する際に使用する
   * @param document body 要素を指定するために使用する
   */
  constructor(
    private router: Router,
    private renderer: Renderer,
    @Inject(DOCUMENT) private document: any
  ) {
    this.router.events.subscribe((event) => {
      // ページ遷移時はサイドメニューを閉じ、ページトップに遷移させる
      if (event instanceof NavigationEnd) {
        this.toggleMenu(false);
        window.scrollTo(0, 0);
      }
    });
  }
  
  /**
   * サイドメニューを開閉する
   * 
   * @param isShown サイドメニューを強制的に開く場合は true・強制的に閉じる場合は false を指定する
   */
  toggleMenu(isShown?: boolean): void {
    // 引数が指定されていれば引数に従って操作、そうでなければ現在の状態を反転させる
    this.isShownMenu = typeof isShown !== 'undefined' ? isShown : !this.isShownMenu;
    this.renderer.setElementClass(this.document.body, 'show-menu', this.isShownMenu);
  }
}
