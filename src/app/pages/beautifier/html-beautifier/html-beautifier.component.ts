import { Component } from '@angular/core';

/**
 * HTML Beautifier
 */
@Component({
  selector: 'app-html-beautifier',
  templateUrl: './html-beautifier.component.html',
  styleUrls: ['./html-beautifier.component.scss']
})
export class HtmlBeautifierComponent {
  /** 言語 */
  public language: string = 'html';
  /** オプション */
  public options: any = {
    indent_size: 2,
    indent_inner_html: true,
    max_preserve_newlines: 5,
    extra_liners: [],
    // JavaScript
    break_chained_methods: true,
    space_before_conditional: false
  };
}
