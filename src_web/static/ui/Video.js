// src_web/ui/Video.ts
export class Video {
    element;
    videoEl;
    constructor(view) {
        // 親div作成
        this.element = document.createElement("div");
        this.element.style.display = "inline-block";
        this.element.style.padding = "2px 4px";
        // video要素作成
        this.videoEl = document.createElement("video");
        this.videoEl.src = view.src;
        this.videoEl.autoplay = view.autoplay ?? false;
        this.videoEl.controls = view.controls ?? true;
        this.videoEl.loop = view.loop ?? false;
        if (view.width)
            this.videoEl.width = view.width;
        if (view.height)
            this.videoEl.height = view.height;
        // JSON解析用に属性を保持
        this.element.dataset.objtype = "video";
        this.element.dataset.src = view.src;
        if (view.autoplay)
            this.element.dataset.autoplay = "true";
        if (view.controls !== undefined)
            this.element.dataset.controls = view.controls ? "true" : "false";
        if (view.loop)
            this.element.dataset.loop = "true";
        if (view.width)
            this.element.dataset.width = view.width.toString();
        if (view.height)
            this.element.dataset.height = view.height.toString();
        this.element.appendChild(this.videoEl);
    }
    // 再生
    play() {
        this.videoEl.play();
    }
    // 停止
    pause() {
        this.videoEl.pause();
    }
    // 音量（0～1）
    setVolume(vol) {
        this.videoEl.volume = Math.max(0, Math.min(1, vol));
    }
    // ソース変更
    setSrc(src) {
        this.videoEl.src = src;
        this.element.dataset.src = src;
    }
    // ループ設定
    setLoop(loop) {
        this.videoEl.loop = loop;
        this.element.dataset.loop = loop ? "true" : "false";
    }
}
