import { ChangeDetectorRef, Directive, ElementRef, HostListener, Input } from '@angular/core';

import { DndService } from 'app/pages/touch-friendly-dnd/services/dnd.service';

/**
 * DraggableDirective をドロップ可能な要素のディレクティブ
 */
@Directive({
  selector: '[appDndDroppable]'
})
export class DndDroppableDirective {
  /** 自身が抱えるデータ */
  @Input()
  public containerData: Array<any>;
  
  /**
   * コンストラクタ
   *
   * @param elementRef 要素の参照
   * @param changeDetectorRef 再描画用
   * @param dndService ドラッグ中のデータを管理するサービス
   */
  constructor(
    private elementRef: ElementRef,
    private changeDetectorRef: ChangeDetectorRef,
    private dndService: DndService
  ) { }
  
  // TODO : DragStart event.preventDefault();
  
  /**
   * この要素に何かがドラッグされ始めた時
   * 
   * @event イベント
   */
  @HostListener('dragenter', ['$event'])
  onDragEnter(event: DragEvent): void {
    // DraggableDirective をドラッグして重ねたワケではない場合は無視する
    if (!this.dndService.isDragged) {
      return;
    }
    
    // サービスからドラッグ中の要素を拾う
    const draggingData = this.dndService.draggingDataContainer.containerData[this.dndService.draggingDataIndex];
    
    // 自身のデータ中にドラッグ中の要素がない場合 : よそからデータをドラッグされている状態
    if (this.containerData.indexOf(draggingData) === -1) {
      console.log('DROPPABLE dragenter');
      // 「ドラッグ中の要素のコンテナ」からドラッグ中の要素を消す
      this.dndService.draggingDataContainer.containerData.splice(this.dndService.draggingDataIndex, 1);
      // 自分にドラッグ中の要素を追加する (とりあえず先頭に入れておき、その後の順番は Draggable 同士の DragEnter で処理する)
      this.containerData.splice(0, 0, draggingData);
      // 自分を「ドラッグ中の要素のコンテナ」にする
      this.dndService.draggingDataIndex = 0;
      this.dndService.draggingDataContainer = this;
    }
    setTimeout(() => {
      this.changeDetectorRef.detectChanges();
    }, 250);
  }
  
  /**
   * この要素に何かが重なっている時
   * 
   * @event イベント
   */
  @HostListener('dragover', ['$event'])
  onDragOver(event: DragEvent): void {
    // Drop イベントを発火させるためにイベントを切っておく
    if (event.preventDefault) {
      console.log('DROPPABLE dragover');
      event.preventDefault();
    }
  }
  
  // TODO : DragEnd parentElement.removeChild(dragHelper)
  
  /**
   * この要素をドロップした時
   * 
   * @event イベント
   */
  @HostListener('drop', ['$event'])
  onDrop(event: DragEvent): void {
    console.log('DROPPABLE drop!');
    if (event.preventDefault) {
      event.preventDefault();
    }
    if (event.stopPropagation) {
        event.stopPropagation();
    }
    
    // サービスを初期化する
    this.dndService.isDragged = false;
    this.dndService.draggingDataElem = null;
    this.dndService.draggingDataContainer = null;
    this.dndService.draggingDataIndex = null;
    console.log('DROPPABLE drop');
  }
  
  public detectChanges(): void {
    setTimeout(() => {
      this.changeDetectorRef.detectChanges();
    }, 250);
  }
}
