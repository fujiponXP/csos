// src_web/ui/Label.ts

export type LabelView = { text: string };

export class Label {
  element: HTMLDivElement;

  constructor(view: LabelView) {
    this.element = document.createElement("div");
    this.element.textContent = view.text;

    // CSSでラベルっぽく調整
    this.element.style.display = "inline-block";
    this.element.style.padding = "2px 4px";
    this.element.style.fontFamily = "sans-serif";
    this.element.style.fontSize = "14px";
    this.element.style.color = "#000";

    // JSON解析用に属性を保持
    this.element.dataset.objtype = "label";
    this.element.dataset.text = view.text;
  }

  // ラベルのテキスト更新
  setText(text: string) {
    this.element.textContent = text;
    this.element.dataset.text = text;
  }
}
