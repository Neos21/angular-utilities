import { Component, Inject, Renderer } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  /** .menu の表示状況を管理するフラグ */
  public isShownMenu: boolean = false;
  
  constructor(private renderer: Renderer, @Inject(DOCUMENT) private document: any) {}
  
  toggleMenu(): void {
    this.isShownMenu = !this.isShownMenu;
    this.renderer.setElementClass(this.document.body, 'show-menu', this.isShownMenu);
  }
}
