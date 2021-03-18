import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

/**
 * アプリのルートコンポーネント
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  /** サイドメニュー .menu の表示状況を管理するフラグ */
  public isShownMenu: boolean = false;
  
  /**
   * コンストラクタ
   * 
   * @param router 画面遷移を検知するために使用する
   * @param renderer2 body 要素に class を付与する際に使用する
   * @param document body 要素を指定するために使用する
   */
  constructor(
    private router: Router,
    private renderer2: Renderer2,
    @Inject(DOCUMENT) private document: any
  ) {
    this.router.events.subscribe((event) => {
      // ページ遷移時はサイドメニューを閉じ、ページトップに遷移させる
      if(event instanceof NavigationEnd) {
        this.toggleMenu(false);
        window.scrollTo(0, 0);
      }
    });
  }
  
  /**
   * 初期表示時の処理
   */
  public ngOnInit(): void {
    // SessionStorage より 404.html からのリダイレクト URL 情報が取得できたら対象のページに遷移する
    const redirectUrl = (sessionStorage as any).redirect;
    delete (sessionStorage as any).redirect;
    if(redirectUrl && redirectUrl !== location.href) {
      // ハッシュやパラメータ「#」「?」「;」を除去する (現状パラメータを利用するページはないので不要)
      const pureUrl = redirectUrl.split(/#|\?|;/)[0];
      window.history.replaceState(null, null, pureUrl);
      // ドメイン・アプリルート部分を削除して遷移する
      const navigateUrl = pureUrl.replace(/http.*:\/\/.*\/angular-utilities/, '');
      this.router.navigate([navigateUrl])
        .catch(() => {
          // エラー時 (受け取った URL が不正だった場合など) はルートに遷移する
          this.router.navigate(['']);
        });
    }
  }
  
  /**
   * サイドメニューを開閉する
   * 
   * @param isShown サイドメニューを強制的に開く場合は true・強制的に閉じる場合は false を指定する
   */
  public toggleMenu(isShown?: boolean): void {
    // 引数が指定されていれば引数に従って操作、そうでなければ現在の状態を反転させる
    this.isShownMenu = typeof isShown !== 'undefined' ? isShown : !this.isShownMenu;
    this.renderer2[this.isShownMenu ? 'addClass' : 'removeClass'](this.document.body, 'show-menu');
  }
}
