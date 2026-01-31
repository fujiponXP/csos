import { PopupMenuItem } from "./PopupMenuItem.js";

export class PopupMenu {
  element: HTMLDivElement;
  private visible = false;

  /**
   * @param items メニュー項目
   * @param title メニュータイトル（省略可能）
   */
  constructor(items: PopupMenuItem[], title?: string) {
    this.element = document.createElement("div");
    this.element.className = "popup-menu";
    this.element.style.position = "absolute";
    this.element.style.display = "none";

    // タイトルが渡されていれば追加
    if (title) {
      const titleEl = document.createElement("div");
      titleEl.className = "popup-menu-title";
      titleEl.textContent = title;
      this.element.appendChild(titleEl);
    }

    // メニュー項目生成
    items.forEach(item => {
      const itemEl = document.createElement("div");
      itemEl.className = "popup-menu-item";
      itemEl.textContent = item.label;

      if (item.disabled) {
        itemEl.classList.add("disabled");
      } else {
        itemEl.addEventListener("click", (e) => {
          e.stopPropagation();
          item.onClick();
          this.hide();
        });
      }

      this.element.appendChild(itemEl);
    });

    // 外側クリックで閉じる
    document.addEventListener("mousedown", (e) => {
      if (!this.visible) return;
      if (!this.element.contains(e.target as Node)) {
        this.hide();
      }
    });
  }

  show(x: number, y: number) {
    this.element.style.left = `${x}px`;
    this.element.style.top = `${y}px`;
    this.element.style.display = "block";
    this.visible = true;
  }

  hide() {
    this.element.style.display = "none";
    this.visible = false;
  }

  toggle(x: number, y: number) {
    this.visible ? this.hide() : this.show(x, y);
  }
}
