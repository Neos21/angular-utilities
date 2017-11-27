import { Injectable } from '@angular/core';

import { DndDroppableDirective } from '../directives/dnd-droppable.directive';

/**
 * DnD の状況を管理するサービス
 */
@Injectable()
export class DndService {
  /** Draggable・Droppable で管理しているデータをドラッグ中かどうか (それ以外の要素の DnD は無視するため) */
  isDragged: boolean = false;
  /** ドラッグ中の要素の HTML */
  draggingDataElem: HTMLElement;
  /** ドラッグ中の要素が draggingDataContainer 内のどこにあるか添字 */
  draggingDataIndex: number;
  /** ドラッグ中の要素を抱えるコンテナ要素 (Droppable ディレクティブ) */
  draggingDataContainer: DndDroppableDirective;
}
