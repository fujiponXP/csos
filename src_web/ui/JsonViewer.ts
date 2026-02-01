// ./ui/JsonViewer.ts
import { Window } from "./Window.js";
import { TitleBar } from "./TitleBar.js";

export class JsonViewer {
  private win: Window;
  private contentEl: HTMLDivElement;

  constructor(title: string) {
    this.win = new Window(title);

    // コンテンツエリア
    this.contentEl = document.createElement("div");
    this.contentEl.style.overflowY = "auto";  // 縦スクロール
    this.contentEl.style.padding = "8px";
    this.contentEl.style.whiteSpace = "pre"; // JSONを整形表示
    this.contentEl.style.fontFamily = "monospace";
    this.contentEl.style.maxHeight = "400px"; // 最大高さ調整

    this.win.setContent(this.contentEl);

    this.win.setStatus("Ready");
  }

  // JSON文字列をセットして表示
  public setJson(json: unknown) {
    try {
      const formatted = JSON.stringify(json, null, 2); // 2スペースで整形
      this.contentEl.textContent = formatted;
    } catch (err) {
      this.contentEl.textContent = "Invalid JSON data";
    }
  }

  public show(parent: HTMLElement = document.body) {
    this.win.show(parent);
  }
}
