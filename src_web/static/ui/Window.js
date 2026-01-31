// src_web/ui/Window.ts
import { Button } from "./Button.js";
import { TitleBar } from "./TitleBar.js";
import { StatusBar } from "./StatusBar.js";
export class Window {
    title;
    element;
    contentEl;
    titleBar;
    statusBar;
    minimized = false;
    maximized = false;
    constructor(title) {
        this.title = title;
        // ===============================
        // ウインドウ本体
        // ===============================
        this.element = document.createElement("div");
        this.element.className = "window";
        // ===============================
        // ボタン作成（画像のみ・16x16）
        // ===============================
        const btnMin = new Button({ kind: "icon", icon: "/static/button_minimize.png" }, this.onButtonClick.bind(this), "minimize");
        btnMin.setSize(16);
        const btnMax = new Button({ kind: "icon", icon: "/static/button_maximize.png" }, this.onButtonClick.bind(this), "maximize");
        btnMax.setSize(16);
        const btnClose = new Button({ kind: "icon", icon: "/static/button_close.png" }, this.onButtonClick.bind(this), "close");
        btnClose.setSize(16);
        // ===============================
        // タイトルバー
        // ===============================
        this.titleBar = new TitleBar(title, [btnMin, btnMax, btnClose]);
        this.element.appendChild(this.titleBar.element);
        // ===============================
        // コンテンツ領域
        // ===============================
        this.contentEl = document.createElement("div");
        this.contentEl.className = "content";
        this.element.appendChild(this.contentEl);
        // ===============================
        // ステータスバー
        // ===============================
        this.statusBar = new StatusBar();
        this.element.appendChild(this.statusBar.element);
    }
    // ===============================
    // 表示制御
    // ===============================
    show(parent = document.body) {
        parent.appendChild(this.element);
    }
    hide() {
        this.element.remove();
    }
    setContent(html) {
        this.contentEl.innerHTML = html;
    }
    setStatus(text) {
        this.statusBar.setText(text);
    }
    // ===============================
    // 状態取得（永続化・デバッグ用）
    // ===============================
    toJSON() {
        return {
            title: this.title,
            content: this.contentEl.innerHTML,
            status: this.statusBar.getText(),
            minimized: this.minimized,
            maximized: this.maximized,
        };
    }
    // ===============================
    // ボタンイベント
    // ===============================
    onButtonClick(type) {
        switch (type) {
            case "minimize":
                this.minimized = !this.minimized;
                this.contentEl.style.display = this.minimized ? "none" : "block";
                this.statusBar.element.style.display = this.minimized ? "none" : "block";
                break;
            case "maximize":
                this.maximized = !this.maximized;
                if (this.maximized) {
                    this.element.style.position = "fixed";
                    this.element.style.top = "0";
                    this.element.style.left = "0";
                    this.element.style.width = "100%";
                    this.element.style.height = "100%";
                }
                else {
                    this.element.style.position = "";
                    this.element.style.width = "";
                    this.element.style.height = "";
                }
                break;
            case "close":
                this.hide();
                break;
        }
    }
}
