import { ChangeDetectorRef, Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';

import { DndDroppableDirective } from 'app/pages/touch-friendly-dnd/directives/dnd-droppable.directive';
import { DndService } from '../services/dnd.service';

/**
 * DroppableDirective 内でドラッグ配置が可能な要素のディレクティブ
 */
@Directive({
  selector: '[appDndDraggable]'
})
export class DndDraggableDirective implements OnInit {
  /** Droppable コンテナにおけるこの要素の添字 */
  @Input()
  public containerIndex: number;
  
  /**
   * コンストラクタ
   *
   * @param elementRef 要素の参照
   * @param changeDetectorRef 再描画用
   * @param dndService ドラッグ中のデータを管理するサービス
   * @param dndDroppableDirective 自身が属するコンテナの参照
   */
  constructor(
    private elementRef: ElementRef,
    private changeDetectorRef: ChangeDetectorRef,
    private dndService: DndService,
    private dndDroppableDirective: DndDroppableDirective
  ) { }
  
  /**
   * 初期処理 : ドラッグ可能な要素として設定する
   */
  ngOnInit(): void {
    this.elementRef.nativeElement.draggable = true;
  }
  
  /**
   * この要素をドラッグし始めた時
   * 
   * @event イベント
   */
  @HostListener('dragstart', ['$event'])
  onDragStart(event: DragEvent): void {
    // TODO : event.preventDefault();
    
    // このドラッグ操作で許可する操作を先に指定する
    event.dataTransfer.effectAllowed = 'move';
    // スタイルを消す
    if(this.dndService.draggingDataElem) {
      this.dndService.draggingDataElem.classList.remove('dnd-dragging');
    }
    // サービスにドラッグ中の状態を持たせる
    this.dndService.isDragged = true;
    this.dndService.draggingDataElem = this.elementRef.nativeElement;
    this.dndService.draggingDataElem.classList.add('dnd-dragging');
    this.dndService.draggingDataIndex = this.containerIndex;
    this.dndService.draggingDataContainer = this.dndDroppableDirective;
    
    // Firefox 向け : setData() しないとドラッグできない
    event.dataTransfer.setData('text', '');
    
    // DragImage を作る
    // const dragImage = this.elementRef.nativeElement.cloneNode(true);
    // dragImage.classList.add('dnd-drag-image');
    // dragImage.style.position = 'absolute';
    // dragImage.style.top = '0';
    // dragImage.style.left = '0';
    // console.log(this.elementRef.nativeElement, dragImage);
    // this.elementRef.nativeElement.parentElement.appendChild(dragImage);
    // event.dataTransfer.setDragImage(dragImage, event.offsetX, event.offsetY);
  }
  
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
    
    // スタイルを消す
    this.dndService.draggingDataElem.classList.remove('dnd-dragging');
    // 要素を切り替える
    this.dndService.draggingDataElem = this.elementRef.nativeElement;
    // スタイルを再指定する
    this.dndService.draggingDataElem.classList.add('dnd-dragging');
    
    // 重なってきた要素がドラッグ中の要素でなければ処理する
    if(this.dndService.draggingDataIndex !== this.containerIndex ||
       this.dndService.draggingDataContainer.containerData !== this.dndDroppableDirective.containerData) {
      console.log('お？', this.containerIndex);
      // 重なってきたドラッグ中の要素
      const draggingData = this.dndService.draggingDataContainer.containerData[this.dndService.draggingDataIndex];
      
      // 重なってきたドラッグ中の要素をそのコンテナから消す
      this.dndService.draggingDataContainer.containerData.splice(this.dndService.draggingDataIndex, 1);
      // TODO : アイテム数 0 なら dropEnabled 有効化？
      
      // 重なってきたドラッグ中の要素をこのディレクティブ自身が属するコンテナに挿入する
      this.dndDroppableDirective.containerData.splice(this.containerIndex, 0, draggingData);
      
      // ドラッグ中の要素を再指定する
      this.dndService.draggingDataIndex = this.containerIndex;
      this.dndService.draggingDataContainer = this.dndDroppableDirective;
      
      setTimeout(() => {
        console.log('draggable dragenter detectChanges');
        this.changeDetectorRef.detectChanges();
      }, 250);
    }
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
      event.preventDefault();
    }
    
    // DraggableDirective をドラッグして重ねたワケではない場合は無視する
    if (!this.dndService.isDragged) {
      return;
    }
    
    // この要素とドラッグ中の要素が異なる場合 : 同一の DroppableDirective 内で位置を入れ替えた場合
    // (コンテナが変わった時は DroppableDirective 側で設定している)
    if (this.elementRef.nativeElement !== this.dndService.draggingDataElem) {
      console.log('draggable dragover');
      // スタイルを消す
      this.dndService.draggingDataElem.classList.remove('dnd-dragging');
      // ドラッグ中の要素を再指定する : ココで更新してやらないと別の要素にドラッグ中のスタイルが付いてしまう
      this.dndService.draggingDataElem = this.elementRef.nativeElement;
      this.dndService.draggingDataElem.classList.add('dnd-dragging');
      this.dndService.draggingDataIndex = this.containerIndex;
      this.dndService.draggingDataContainer = this.dndDroppableDirective;
    }
  }

  /**
   * この要素をドロップした時 : Drop イベントは DragEnd イベントより前に発火するが、DroppableDirective の外でドロップした場合は発火しない
   * 
   * @event イベント
   */
  @HostListener('drop', ['$event'])
  onDrop(event: DragEvent): void {
    if (event.preventDefault) {
      event.preventDefault();
    }
    if (event.stopPropagation) {
        event.stopPropagation();
    }
    
    // ドラッグ中のクラスを削除する
    this.elementRef.nativeElement.classList.remove('dnd-dragging');
    // サービスを初期化する
    this.dndService.isDragged = false;
    this.dndService.draggingDataElem = null;
    this.dndService.draggingDataContainer = null;
    this.dndService.draggingDataIndex = null;
    
    // 親更新
    this.dndDroppableDirective.detectChanges();
    setTimeout(() => {
      this.changeDetectorRef.detectChanges();
    }, 250);
  }
  
  /**
   * この要素のドラッグを止めた場合 : DroppableDirective の外でドロップした時は Drop イベントが発火せずコチラだけ発火する
   * 
   * @event イベント
   */
  @HostListener('dragend', ['$event'])
  onDragEnd(event: DragEvent): void {
    // ドラッグ中のクラスを削除する
    this.elementRef.nativeElement.classList.remove('dnd-dragging');
    // サービスを初期化する
    this.dndService.isDragged = false;
    this.dndService.draggingDataElem = null;
    this.dndService.draggingDataContainer = null;
    this.dndService.draggingDataIndex = null;
  }
}
