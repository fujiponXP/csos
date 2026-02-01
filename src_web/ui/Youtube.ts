// src_web/ui/Youtube.ts

export type YoutubeView = {
  videoId: string;        // YouTubeのVIDEO_ID
  autoplay?: boolean;
  controls?: boolean;
  loop?: boolean;
  start?: number;         // 開始秒
  width?: number;         // px
  height?: number;        // px
  fitParent?: boolean;    // 親要素にフィット
};

export class Youtube {
  element: HTMLDivElement;
  private iframeEl: HTMLIFrameElement;

  constructor(view: YoutubeView) {
    // 親div
    this.element = document.createElement("div");
    this.element.style.display = "inline-block";
    this.element.style.padding = "2px 4px";

    // iframe作成
    this.iframeEl = document.createElement("iframe");
    this.iframeEl.allow =
      "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
    this.iframeEl.allowFullscreen = true;
    this.iframeEl.frameBorder = "0";

    // URL生成
    this.iframeEl.src = this.buildEmbedUrl(view);

    // サイズ指定
    if (view.fitParent) {
      this.element.style.width = "100%";
      this.element.style.height = "100%";
      this.iframeEl.style.width = "100%";
      this.iframeEl.style.height = "100%";
    } else {
      if (view.width) this.iframeEl.width = view.width.toString();
      if (view.height) this.iframeEl.height = view.height.toString();
    }

    // JSON復元用dataset
    this.element.dataset.objtype = "youtube";
    this.element.dataset.videoId = view.videoId;
    if (view.autoplay) this.element.dataset.autoplay = "true";
    if (view.controls !== undefined)
      this.element.dataset.controls = view.controls ? "true" : "false";
    if (view.loop) this.element.dataset.loop = "true";
    if (view.start !== undefined)
      this.element.dataset.start = view.start.toString();
    if (view.width) this.element.dataset.width = view.width.toString();
    if (view.height) this.element.dataset.height = view.height.toString();
    if (view.fitParent) this.element.dataset.fitParent = "true";

    this.element.appendChild(this.iframeEl);
  }

  // embed URL生成
  private buildEmbedUrl(view: YoutubeView): string {
    const params = new URLSearchParams();
    params.set("autoplay", view.autoplay ? "1" : "0");
    params.set("controls", view.controls === false ? "0" : "1");
    params.set("rel", "0");

    if (view.loop) {
      params.set("loop", "1");
      params.set("playlist", view.videoId); // loop必須仕様
    }
    if (view.start !== undefined) {
      params.set("start", view.start.toString());
    }

    return `https://www.youtube.com/embed/${view.videoId}?${params.toString()}`;
  }

  // 動画差し替え
  setVideo(videoId: string) {
    this.element.dataset.videoId = videoId;
    this.iframeEl.src = this.buildEmbedUrl({
      videoId,
      autoplay: this.element.dataset.autoplay === "true",
      controls: this.element.dataset.controls !== "false",
      loop: this.element.dataset.loop === "true",
      start: this.element.dataset.start
        ? parseInt(this.element.dataset.start)
        : undefined
    });
  }
}
