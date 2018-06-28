import { Component } from '@angular/core';

/**
 * CSS Beautifier
 */
@Component({
  selector: 'app-css-beautifier',
  templateUrl: './css-beautifier.component.html',
  styleUrls: ['./css-beautifier.component.scss']
})
export class CssBeautifierComponent {
  /** 言語 */
  public language: string = 'css';
  /** オプション */
  public options: any = {
    indent_size: 2
  };
}
