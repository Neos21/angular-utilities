import { Component } from '@angular/core';

/**
 * Font Family Tester
 * 
 * 指定したいフォントを追加・並べ替え、動的に font-family を適用する。
 * プリセット外のフォント名もテキストボックスより追加可能。
 */
@Component({
  selector: 'app-font-family-tester',
  templateUrl: './font-family-tester.component.html',
  styleUrls: ['./font-family-tester.component.scss']
})
export class FontFamilyTesterComponent {
  /** プレビューの表示仕様 */
  public previewTextSpec: any = {
    /** 太字 */
    weight: false,
    /** 斜体 */
    italic: false,
    /** フォントサイズ (true で大きめにする) */
    size: true
  };
  
  /** プレビューに適用するフォントの配列 */
  public previewFontList: Array<any> = [];
  
  /** 候補フォント一覧 */
  public stockFontList: Array<any> = [
    // sans-serif
    { type: 'sans-serif', name: `-apple-system`                  },  // Apple システムフォント
    { type: 'sans-serif', name: `BlinkMacSystemFont`             },
    { type: 'sans-serif', name: `"Helvetica Neue"`               },  // 英字フォント
    { type: 'sans-serif', name: `HelveticaNeue`                  },
    { type: 'sans-serif', name: `"Segoe UI"`                     },
    { type: 'sans-serif', name: `Helvetica`                      },
    { type: 'sans-serif', name: `Arial`                          },
    { type: 'sans-serif', name: `Verdana`                        },
    { type: 'sans-serif', name: `"游ゴシック体"`                 },  // 游ゴシック
    { type: 'sans-serif', name: `YuGothic`                       },
    { type: 'sans-serif', name: `"游ゴシック Medium"`            },
    { type: 'sans-serif', name: `"Yu Gothic Medium"`             },
    { type: 'sans-serif', name: `"游ゴシック"`                   },
    { type: 'sans-serif', name: `"Yu Gothic"`                    },
    { type: 'sans-serif', name: `"Hiragino Sans"`                },  // ヒラギノ角ゴシック
    { type: 'sans-serif', name: `"ヒラギノ角ゴシック"`           },
    { type: 'sans-serif', name: `"ヒラギノ角ゴ ProN W3"`         },  // ヒラギノ・メイリオ
    { type: 'sans-serif', name: `"Hiragino Kaku Gothic ProN W3"` },
    { type: 'sans-serif', name: `HiraKakuProN-W3`                },
    { type: 'sans-serif', name: `"ヒラギノ角ゴ ProN"`            },
    { type: 'sans-serif', name: `"Hiragino Kaku Gothic ProN"`    },
    { type: 'sans-serif', name: `"ヒラギノ角ゴ Pro"`             },
    { type: 'sans-serif', name: `"Hiragino Kaku Gothic Pro"`     },
    { type: 'sans-serif', name: `"メイリオ"`                     },
    { type: 'sans-serif', name: `Meiryo`                         },
    { type: 'sans-serif', name: `Osaka`                          },  // Osaka・MS P ゴシック
    { type: 'sans-serif', name: `"ＭＳ Ｐゴシック"`              },
    { type: 'sans-serif', name: `"MS PGothic"`                   },
    { type: 'sans-serif', name: `sans-serif`                     },  // 総称
    
    // serif
    { type: 'serif', name: `Georgia`                   },  // 英字フォント
    { type: 'serif', name: `"游明朝体"`                },  // 游明朝
    { type: 'serif', name: `"YuMincho"`                },
    { type: 'serif', name: `"游明朝"`                  },
    { type: 'serif', name: `"Yu Mincho"`               },
    { type: 'serif', name: `"ヒラギノ明朝 ProN W3"`    },  // ヒラギノ・HG 明朝
    { type: 'serif', name: `"Hiragino Mincho ProN W3"` },
    { type: 'serif', name: `HiraMinProN-W3`            },
    { type: 'serif', name: `"ヒラギノ明朝 ProN"`       },
    { type: 'serif', name: `"Hiragino Mincho ProN"`    },
    { type: 'serif', name: `"ヒラギノ明朝 Pro"`        },
    { type: 'serif', name: `"Hiragino Mincho Pro"`     },
    { type: 'serif', name: `"HG明朝E"`                 },
    { type: 'serif', name: `"HGS明朝E"`                },
    { type: 'serif', name: `"ＭＳ Ｐ明朝"`             },  // MS P 明朝
    { type: 'serif', name: `"MS PMincho"`              },
    { type: 'serif', name: `serif`                     },  // 総称
    
    // monospace
    { type: 'monospace', name: `MeiryoKe_Gothic`    },  // サードパーティ
    { type: 'monospace', name: `"Ricty Diminished"` },
    { type: 'monospace', name: `"Courier New"`      },  // 英字フォント
    { type: 'monospace', name: `Courier`            },
    { type: 'monospace', name: `Monaco`             },
    { type: 'monospace', name: `Menlo`              },
    { type: 'monospace', name: `Consolas`           },
    { type: 'monospace', name: `"Lucida Console"`   },
    { type: 'monospace', name: `"Osaka－等幅"`      },  // Osaka-mono・MS ゴシック
    { type: 'monospace', name: `"Osaka-等幅"`       },
    { type: 'monospace', name: `Osaka-mono`         },
    { type: 'monospace', name: `"ＭＳ ゴシック"`    },
    { type: 'monospace', name: `"MS Gothic"`        },
    { type: 'monospace', name: `monospace`          },  // 総称
  ];
  
  /** 独自追加するフォントの入力欄 */
  public originalFont: string = '';
  
  /**
   * プレビューするフォント一覧を取得する
   * 
   * @return this.previewFontList からプレビューするフォント名をカンマ区切りで列挙した文字列
   */
  public getFontList(): string {
    let fontFamily = '';
    
    this.previewFontList.forEach((font: { type: string; name: string }, index) => {
      if(index === 0) {
        // 先頭はカンマを付けず結合する
        fontFamily += font.name;
      }
      else {
        // 先頭以外はカンマを付与する
        fontFamily += `, ${font.name}`;
      }
    });
    
    return fontFamily;
  }
  
  /**
   * 選択されたフォントをプレビューフォント一覧の1つ上にズラす
   * 
   * @param index 選択された要素の添字
   */
  public upFont(index: number): void {
    // 配列の先頭の要素では何もしない
    if(index === 0) {
      return;
    }
    
    // 選択した要素を1つ上の要素と入れ替える
    const amountRemove = 2;
    this.previewFontList.splice(index - 1, amountRemove, this.previewFontList[index], this.previewFontList[index - 1]);
  }
  
  /**
   * 選択されたフォントをプレビューフォント一覧の1つ下にズラす
   * 
   * @param index 選択された要素の添字
   */
  public downFont(index: number): void {
    // 配列の最後の要素では何もしない
    if(index === this.previewFontList.length - 1) {
      return;
    }
    
    // 選択した要素を1つ下の要素と入れ替える
    const amountRemove = 2;
    this.previewFontList.splice(index, amountRemove, this.previewFontList[index + 1], this.previewFontList[index]);
  }
  
  /**
   * プレビューフォント一覧から要素を削除し、候補フォント一覧に戻す
   * 
   * やっていることは addPreviewFontList() と同じ
   * 
   * @param index プレビューフォント一覧における、移動対象の要素の添字
   */
  public removeFont(index: number): void {
    Array.prototype.push.apply(this.stockFontList, this.previewFontList.splice(index, 1));
  }
  
  /**
   * 候補フォント一覧からプレビューフォント一覧に要素を追加する (値を移す)
   * 
   * 候補フォント一覧から、添字を指定して splice() を使って要素を削除する
   * splice() の戻り値は削除した要素なので、コレをプレビューフォント一覧に追加する
   * 
   * @param index 候補フォント一覧の配列における、移動対象の要素の添字
   */
  public addPreviewFontList(index: number): void {
    Array.prototype.push.apply(this.previewFontList, this.stockFontList.splice(index, 1));
  }
  
  /**
   * フォントを独自に追加する
   */
  public addOriginalFont(): void {
    // 空欄やスペースのみなら何もしない
    if(this.originalFont === '' || /^\s+$/g.test(this.originalFont)) {
      return;
    }
    
    // 受け取った文字を候補フォント一覧の先頭に追加する
    this.stockFontList.unshift({
      type: 'original',
      name: this.originalFont
    });
    // 未入力状態に戻す
    this.originalFont = '';
  }
}
