// src_web/ui/Audio.ts

export type AudioView = {
  src: string;      // MP3 ファイルの URL
  autoplay?: boolean;
  controls?: boolean;
};

export class Audio {
  element: HTMLDivElement;
  private audioEl: HTMLAudioElement;

  constructor(view: AudioView) {
    this.element = document.createElement("div");
    this.element.style.display = "inline-block";
    this.element.style.padding = "2px 4px";

    this.audioEl = document.createElement("audio");
    this.audioEl.src = view.src;
    this.audioEl.autoplay = view.autoplay ?? false;
    this.audioEl.controls = view.controls ?? true;

    // JSON解析用に属性を保持
    this.element.dataset.objtype = "audio";
    this.element.dataset.src = view.src;

    this.element.appendChild(this.audioEl);
  }

  // 再生
  play() {
    this.audioEl.play();
  }

  // 停止
  pause() {
    this.audioEl.pause();
  }

  // 音量（0～1）
  setVolume(vol: number) {
    this.audioEl.volume = Math.max(0, Math.min(1, vol));
  }

  // ソース変更
  setSrc(src: string) {
    this.audioEl.src = src;
    this.element.dataset.src = src;
  }
}
