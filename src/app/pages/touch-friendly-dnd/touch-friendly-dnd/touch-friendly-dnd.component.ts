import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-touch-friendly-dnd',
  templateUrl: './touch-friendly-dnd.component.html',
  styleUrls: ['./touch-friendly-dnd.component.scss']
})
export class TouchFriendlyDndComponent {
  public items: Array<string> = ['1st', '2nd', '3rd', '4th', '5th'];
  public dataList: Array<string> = ['aaa', 'bbb', 'ccc', 'ddd', 'eee'];
}
