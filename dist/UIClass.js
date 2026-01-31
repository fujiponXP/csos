export class Button {
    constructor(label, callback, type) {
        this.callback = callback;
        this.type = type;
        this.element = document.createElement("button");
        this.element.textContent = label;
        this.element.addEventListener("click", () => this.callback(this.type));
    }
}
// ===============================
// タイトルバー
// ===============================
export class TitleBar {
    constructor(title, buttons) {
        this.title = title;
        this.element = document.createElement("div");
        this.element.className = "titlebar";
        // タイトルテキスト
        const titleEl = document.createElement("span");
        titleEl.textContent = title;
        titleEl.className = "title";
        this.element.appendChild(titleEl);
        // ボタン群
        const buttonContainer = document.createElement("div");
        buttonContainer.className = "button-container";
        buttons.forEach(btn => buttonContainer.appendChild(btn.element));
        this.element.appendChild(buttonContainer);
    }
}
// ===============================
// ステータスバー
// ===============================
export class StatusBar {
    constructor(initialText = "") {
        this.element = document.createElement("div");
        this.element.className = "statusbar";
        this.element.textContent = initialText;
    }
    setText(text) {
        this.element.textContent = text;
    }
    getText() {
        return this.element.textContent || "";
    }
}
// ===============================
// ウインドウクラス
// ===============================
export class Window {
    constructor(title) {
        this.title = title;
        this.minimized = false;
        this.maximized = false;
        this.element = document.createElement("div");
        this.element.className = "window";
        // ボタン作成
        const buttons = [
            new Button("_", this.onButtonClick.bind(this), "minimize"),
            new Button("[ ]", this.onButtonClick.bind(this), "maximize"),
            new Button("X", this.onButtonClick.bind(this), "close"),
        ];
        // タイトルバー
        this.titleBar = new TitleBar(title, buttons);
        this.element.appendChild(this.titleBar.element);
        // コンテンツ領域
        this.contentEl = document.createElement("div");
        this.contentEl.className = "content";
        this.element.appendChild(this.contentEl);
        // ステータスバー
        this.statusBar = new StatusBar();
        this.element.appendChild(this.statusBar.element);
    }
    // ===============================
    // ウインドウ表示操作
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
    // ボタンコールバック
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
//# sourceMappingURL=UIClass.js.map