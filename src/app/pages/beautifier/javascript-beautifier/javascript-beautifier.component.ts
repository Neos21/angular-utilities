import { Component, DoCheck } from '@angular/core';

/**
 * JavaScript Beautifier
 */
@Component({
  selector: 'app-javascript-beautifier',
  templateUrl: './javascript-beautifier.component.html',
  styleUrls: ['./javascript-beautifier.component.scss']
})
export class JavaScriptBeautifierComponent {
  /** 言語 */
  public language: string = 'js';
  /** オプション */
  public options: any = {
    indent_size: 2,
    break_chained_methods: true,
    space_before_conditional: false
  };
}
