// src_web/ui/Window.ts
import { Button } from "./Button.js";
import { TitleBar } from "./TitleBar.js";
import { StatusBar } from "./StatusBar.js";
import { JsonViewer } from "./JsonViewer.js";
export class Window {
    title;
    jsonBuilder;
    element;
    contentEl;
    titleBar;
    statusBar;
    minimized = false;
    maximized = false;
    constructor(title, jsonBuilder // JsonWindow 用
    ) {
        this.title = title;
        this.jsonBuilder = jsonBuilder;
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
        // タイトルバー（メニューハンドラ付き）
        // ===============================
        const menuHandler = {
            onSave: () => this.saveJson(),
            onShow: () => this.showJson(),
        };
        this.titleBar = new TitleBar(title, [btnMin, btnMax, btnClose], menuHandler);
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
    // ===============================
    // setContent を HTMLElement も受け取れるように拡張
    // ===============================
    setContent(content) {
        this.contentEl.innerHTML = "";
        if (typeof content === "string") {
            this.contentEl.innerHTML = content;
        }
        else {
            this.contentEl.appendChild(content);
        }
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
    // ===============================
    // JSON保存（メニューボタンから呼ばれる）
    // ===============================
    saveJson() {
        if (!this.jsonBuilder)
            return;
        const jsonData = this.jsonBuilder.serialize();
        fetch("/api/save-json", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(jsonData),
        })
            .then(() => this.setStatus("保存完了"))
            .catch(() => this.setStatus("保存失敗"));
    }
    // ===============================
    // JSON表示（メニューボタンから呼ばれる）
    // ===============================
    showJson() {
        if (!this.jsonBuilder)
            return;
        const jsonData = this.jsonBuilder.serialize();
        // JsonViewer を作成して表示
        const jsonViewer = new JsonViewer("JSONデータ");
        jsonViewer.setJson(jsonData); // ← setJsonObjects ではなく setJson を使う
        jsonViewer.show(document.body);
    }
}
