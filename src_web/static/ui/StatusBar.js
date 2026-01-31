// src_web/ui/StatusBar.ts
export class StatusBar {
    element;
    constructor(initialText = "") {
        this.element = document.createElement("div");
        this.element.className = "statusbar";
        this.element.textContent = initialText;
    }
    setText(text) {
        this.element.textContent = text;
    }
    getText() {
        return this.element.textContent ?? "";
    }
    clear() {
        this.setText("");
    }
}
