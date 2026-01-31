// src_web/ui/Button.ts
export class Button {
    callback;
    type;
    element;
    constructor(view, callback, type) {
        this.callback = callback;
        this.type = type;
        this.element = document.createElement("button");
        if (view.kind === "text") {
            this.element.textContent = view.label;
        }
        else if (view.kind === "icon") {
            const img = document.createElement("img");
            img.src = view.icon;
            img.width = 16;
            img.height = 16;
            this.element.appendChild(img);
        }
        else {
            const img = document.createElement("img");
            img.src = view.icon;
            img.width = 16;
            img.height = 16;
            this.element.appendChild(img);
            this.element.append(view.label);
        }
        this.element.addEventListener("click", () => this.callback(this.type));
    }
    setSize(px) {
        this.element.style.width = `${px}px`;
        this.element.style.height = `${px}px`;
    }
}
