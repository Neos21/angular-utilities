import { Component, OnInit } from '@angular/core';

/**
 * Touch Friendly DnD
 * 
 * PC でもスマホでも向いているのは @swimlane/ngx-dnd だった。
 * 内部的には Dragula が使われている。
 */
@Component({
  selector: 'app-touch-friendly-dnd',
  templateUrl: './touch-friendly-dnd.component.html',
  styleUrls: ['./touch-friendly-dnd.component.scss']
})
export class TouchFriendlyDndComponent {
  /** 適当なリスト 1 */
  public items1: Array<string> = ['1st', '2nd', '3rd', '4th', '5th'];
  
  /** 適当なリスト 2 */
  public items2: Array<string> = ['aaa', 'bbb', 'ccc', 'ddd', 'eee'];
}
