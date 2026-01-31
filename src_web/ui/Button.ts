// src_web/ui/Button.ts

export type ButtonType = "minimize" | "maximize" | "close";
export type ButtonView =
  | { kind: "text"; label: string }
  | { kind: "icon"; icon: string }
  | { kind: "both"; label: string; icon: string };

export class Button {
  element: HTMLButtonElement;

  constructor(
    view: ButtonView,
    private callback: (type: ButtonType) => void,
    private type: ButtonType
  ) {
    this.element = document.createElement("button");

    if (view.kind === "text") {
      this.element.textContent = view.label;
    } else if (view.kind === "icon") {
      const img = document.createElement("img");
      img.src = view.icon;
      img.width = 16;
      img.height = 16;
      this.element.appendChild(img);
    } else {
      const img = document.createElement("img");
      img.src = view.icon;
      img.width = 16;
      img.height = 16;
      this.element.appendChild(img);
      this.element.append(view.label);
    }

    this.element.addEventListener("click", () =>
      this.callback(this.type)
    );
  }

  setSize(px: number) {
    this.element.style.width = `${px}px`;
    this.element.style.height = `${px}px`;
  }
}
