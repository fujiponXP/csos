import { PopupMenu } from "./PopupMenu.js";
export class TitleBar {
    element;
    dragging = false;
    offsetX = 0;
    offsetY = 0;
    constructor(title, buttons, menuHandler) {
        this.element = document.createElement("div");
        this.element.className = "titlebar";
        // ===============================
        // メニューボタン（左側）
        // ===============================
        const menuBtn = document.createElement("button");
        menuBtn.textContent = "≡"; // ハンバーガーアイコン的な文字
        menuBtn.className = "menu-btn";
        this.element.appendChild(menuBtn);
        // ===============================
        // ポップアップメニュー
        // ===============================
        const popupMenu = new PopupMenu([
            {
                label: "保存",
                onClick: () => {
                    if (menuHandler?.onSave)
                        menuHandler.onSave();
                },
            },
            {
                label: "表示",
                onClick: () => {
                    if (menuHandler?.onShow)
                        menuHandler.onShow();
                },
            },
        ]);
        document.body.appendChild(popupMenu.element);
        // メニューボタンをクリックしたらメニュー表示
        menuBtn.addEventListener("click", (e) => {
            const rect = menuBtn.getBoundingClientRect();
            popupMenu.show(rect.left, rect.bottom + 4);
            e.stopPropagation();
        });
        // ===============================
        // タイトル文字
        // ===============================
        const titleEl = document.createElement("span");
        titleEl.className = "title";
        titleEl.textContent = title;
        this.element.appendChild(titleEl);
        // ===============================
        // ボタンコンテナ（右側）
        // ===============================
        const buttonContainer = document.createElement("div");
        buttonContainer.className = "button-container";
        buttons.forEach(btn => buttonContainer.appendChild(btn.element));
        this.element.appendChild(buttonContainer);
        // ===============================
        // ドラッグで親ウインドウを移動
        // ===============================
        this.element.addEventListener("mousedown", (e) => {
            if (e.button !== 0)
                return;
            const parent = this.element.parentElement;
            if (!parent)
                return;
            this.dragging = true;
            const rect = parent.getBoundingClientRect();
            this.offsetX = e.clientX - rect.left;
            this.offsetY = e.clientY - rect.top;
            parent.style.position = "absolute";
        });
        document.addEventListener("mousemove", (e) => {
            if (!this.dragging)
                return;
            const parent = this.element.parentElement;
            if (!parent)
                return;
            parent.style.left = `${e.clientX - this.offsetX}px`;
            parent.style.top = `${e.clientY - this.offsetY}px`;
        });
        document.addEventListener("mouseup", () => {
            this.dragging = false;
        });
    }
}
