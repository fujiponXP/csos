export class XTwitter {
    element;
    blockquote;
    static scriptLoaded = false;
    constructor(view) {
        this.element = document.createElement("div");
        this.element.style.display = "block";
        this.element.style.padding = "4px 0";
        // blockquote.twitter-tweet を作る
        this.blockquote = document.createElement("blockquote");
        this.blockquote.className = "twitter-tweet";
        if (view.theme) {
            this.blockquote.dataset.theme = view.theme;
        }
        if (view.align) {
            this.blockquote.dataset.align = view.align;
        }
        const link = document.createElement("a");
        link.href = `https://twitter.com/i/status/${view.tweetId}`;
        this.blockquote.appendChild(link);
        // JSON復元用
        this.element.dataset.objtype = "xtwitter";
        this.element.dataset.tweetId = view.tweetId;
        if (view.theme)
            this.element.dataset.theme = view.theme;
        if (view.align)
            this.element.dataset.align = view.align;
        this.element.appendChild(this.blockquote);
        // widgets.js 読み込み
        this.loadScript();
    }
    loadScript() {
        if (XTwitter.scriptLoaded) {
            // 既にロード済みなら再描画だけ
            window.twttr?.widgets?.load(this.element);
            return;
        }
        const script = document.createElement("script");
        script.src = "https://platform.twitter.com/widgets.js";
        script.async = true;
        script.charset = "utf-8";
        script.onload = () => {
            XTwitter.scriptLoaded = true;
            window.twttr?.widgets?.load(this.element);
        };
        document.body.appendChild(script);
    }
}
