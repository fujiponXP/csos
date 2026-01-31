// src_web/ui/TitleBar.ts
import { PopupMenu } from "./PopupMenu.js";
export class TitleBar {
    element;
    dragging = false;
    offsetX = 0;
    offsetY = 0;
    constructor(title, buttons) {
        this.element = document.createElement("div");
        this.element.className = "titlebar";
        // ===============================
        // タイトル文字
        // ===============================
        const titleEl = document.createElement("span");
        titleEl.className = "title";
        titleEl.textContent = title;
        this.element.appendChild(titleEl);
        // ===============================
        // ボタンコンテナ
        // ===============================
        const buttonContainer = document.createElement("div");
        buttonContainer.className = "button-container";
        buttons.forEach(btn => buttonContainer.appendChild(btn.element));
        this.element.appendChild(buttonContainer);
        // ===============================
        // ポップアップメニュー
        // ===============================
        const popupMenu = new PopupMenu([
            {
                label: "タイトル変更",
                onClick: () => {
                    const newTitle = prompt("新しいタイトルを入力", titleEl.textContent ?? "");
                    if (newTitle !== null) {
                        titleEl.textContent = newTitle;
                    }
                }
            },
            {
                label: "ボタン設定",
                onClick: () => {
                    console.log("ボタン設定を開く");
                    // ここで ButtonEditor や設定ウインドウを開く想定
                }
            },
            {
                label: "スタイル設定",
                onClick: () => {
                    console.log("スタイル設定を開く");
                    // テーマ変更 / CSS クラス切り替えなど
                }
            }
        ]);
        document.body.appendChild(popupMenu.element);
        // ===============================
        // 右クリックでメニュー表示
        // ===============================
        this.element.addEventListener("contextmenu", (e) => {
            e.preventDefault();
            popupMenu.show(e.clientX, e.clientY);
        });
        // ===============================
        // ドラッグで親ウインドウを移動
        // （左クリックのみ）
        // ===============================
        this.element.addEventListener("mousedown", (e) => {
            if (e.button !== 0)
                return; // 左クリックのみ
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
