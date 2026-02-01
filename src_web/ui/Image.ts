export type ImageView = {
  src: string;          // 画像ファイルのURL
  width?: number;       // 横幅（px）
  height?: number;      // 高さ（px）
  alt?: string;         // 代替テキスト
  fitParent?: boolean;  // 親にフィットさせるか
};

export class ImageUI {
  element: HTMLDivElement;
  private imgEl: HTMLImageElement;

  constructor(view: ImageView) {
    this.element = document.createElement("div");
    this.element.style.display = "inline-block";
    this.element.style.padding = "2px 4px";
    this.element.style.overflow = "hidden";

    this.imgEl = document.createElement("img");
    this.imgEl.src = view.src;
    this.imgEl.alt = view.alt ?? "";

    if (view.fitParent) {
      // 親にフィットさせる設定
      this.imgEl.style.width = "100%";
      this.imgEl.style.height = "100%";
      this.imgEl.style.objectFit = "contain"; // 縦横比を維持
      this.element.style.width = "100%";
      this.element.style.height = "100%";
    } else {
      if (view.width) this.imgEl.width = view.width;
      if (view.height) this.imgEl.height = view.height;
    }

    // JSON解析用に属性を保持
    this.element.dataset.objtype = "image";
    this.element.dataset.src = view.src;
    if (view.width) this.element.dataset.width = view.width.toString();
    if (view.height) this.element.dataset.height = view.height.toString();
    if (view.alt) this.element.dataset.alt = view.alt;
    if (view.fitParent) this.element.dataset.fitParent = "true";

    this.element.appendChild(this.imgEl);
  }

  setSize(width?: number, height?: number) {
    if (width !== undefined) {
      this.imgEl.width = width;
      this.element.dataset.width = width.toString();
    }
    if (height !== undefined) {
      this.imgEl.height = height;
      this.element.dataset.height = height.toString();
    }
  }

  setSrc(src: string) {
    this.imgEl.src = src;
    this.element.dataset.src = src;
  }

  setAlt(alt: string) {
    this.imgEl.alt = alt;
    this.element.dataset.alt = alt;
  }
}
