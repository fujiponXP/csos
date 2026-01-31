// src_web/ui/StatusBar.ts

export class StatusBar {
  element: HTMLDivElement;

  constructor(initialText: string = "") {
    this.element = document.createElement("div");
    this.element.className = "statusbar";
    this.element.textContent = initialText;
  }

  setText(text: string) {
    this.element.textContent = text;
  }

  getText(): string {
    return this.element.textContent ?? "";
  }

  clear() {
    this.setText("");
  }
}
