// ./ui/JsonParser.ts
import { Button } from "./Button.js";
import { Label } from "./Label.js";
import { Audio } from "./Audio.js";
import { Video } from "./Video.js";
import { ImageUI } from "./Image.js";
import { Youtube } from "./Youtube.js";
import { XTwitter } from "./XTwitter.js";
export class JsonUIBuilder {
    parent;
    constructor(parent) {
        this.parent = parent;
    }
    // JSON配列からコンテンツを生成
    build(jsonArray) {
        this.parent.innerHTML = "";
        jsonArray.forEach(obj => {
            let elementWrapper = null;
            switch (obj.objtype) {
                case "button":
                    if (obj.label) {
                        const btn = new Button({ kind: "text", label: obj.label }, () => {
                            if (obj.url)
                                window.open(obj.url, "_blank");
                        }, "close");
                        btn.element.style.height = "20px";
                        // 元データをDOMに保持
                        btn.element.dataset.objtype = "button";
                        btn.element.dataset.label = obj.label;
                        if (obj.url)
                            btn.element.dataset.url = obj.url;
                        elementWrapper = btn.element;
                    }
                    break;
                case "label":
                    if (obj.text) {
                        const label = new Label({ text: obj.text });
                        // 元データをDOMに保持
                        label.element.dataset.objtype = "label";
                        label.element.dataset.text = obj.text;
                        elementWrapper = label.element;
                    }
                    break;
                case "audio":
                    if (obj.src) {
                        const audio = new Audio({
                            src: obj.src,
                            autoplay: obj.autoplay,
                            controls: obj.controls ?? true
                        });
                        // 元データをDOMに保持
                        audio.element.dataset.objtype = "audio";
                        audio.element.dataset.src = obj.src;
                        if (obj.autoplay)
                            audio.element.dataset.autoplay = "true";
                        if (obj.controls !== undefined)
                            audio.element.dataset.controls = obj.controls ? "true" : "false";
                        elementWrapper = audio.element;
                    }
                    break;
                case "video":
                    if (obj.src) {
                        const video = new Video({
                            src: obj.src,
                            autoplay: obj.autoplay,
                            controls: obj.controls ?? true,
                            width: obj.width,
                            height: obj.height
                        });
                        video.element.dataset.objtype = "video";
                        video.element.dataset.src = obj.src;
                        if (obj.autoplay)
                            video.element.dataset.autoplay = "true";
                        if (obj.controls !== undefined)
                            video.element.dataset.controls = obj.controls ? "true" : "false";
                        if (obj.width)
                            video.element.dataset.width = obj.width.toString();
                        if (obj.height)
                            video.element.dataset.height = obj.height.toString();
                        elementWrapper = video.element;
                    }
                    break;
                case "image":
                    if (obj.src) {
                        const image = new ImageUI({
                            src: obj.src,
                            width: obj.width,
                            height: obj.height,
                            fitParent: obj.fitParent
                        });
                        image.element.dataset.objtype = "image";
                        image.element.dataset.src = obj.src;
                        if (obj.width)
                            image.element.dataset.width = obj.width.toString();
                        if (obj.height)
                            image.element.dataset.height = obj.height.toString();
                        if (obj.fitParent)
                            image.element.dataset.fitParent = "true";
                        elementWrapper = image.element;
                    }
                    break;
                case "youtube":
                    const yt = new Youtube({
                        videoId: obj.videoId,
                        autoplay: obj.autoplay,
                        controls: obj.controls,
                        loop: obj.loop,
                        width: obj.width,
                        height: obj.height,
                        fitParent: obj.fitParent
                    });
                    yt.element.dataset.objtype = "youtube";
                    yt.element.dataset.videoId = obj.videoId;
                    if (obj.autoplay)
                        yt.element.dataset.autoplay = "true";
                    if (obj.controls !== undefined)
                        yt.element.dataset.controls = obj.controls ? "true" : "false";
                    if (obj.loop)
                        yt.element.dataset.loop = "true";
                    if (obj.width)
                        yt.element.dataset.width = obj.width.toString();
                    if (obj.height)
                        yt.element.dataset.height = obj.height.toString();
                    if (obj.fitParent)
                        yt.element.dataset.fitParent = "true";
                    elementWrapper = yt.element;
                    break;
                case "xtwitter": {
                    const xObj = obj;
                    const x = new XTwitter({
                        tweetId: xObj.tweetId,
                        theme: xObj.theme,
                        align: xObj.align
                    });
                    x.element.dataset.objtype = "xtwitter";
                    x.element.dataset.tweetId = xObj.tweetId;
                    if (xObj.theme)
                        x.element.dataset.theme = xObj.theme;
                    if (xObj.align)
                        x.element.dataset.align = xObj.align;
                    elementWrapper = x.element;
                    break;
                }
                default:
                    const unknownObj = obj;
                    console.warn("Unknown objtype:", unknownObj.objtype);
            }
            // 生成した要素を追加
            if (elementWrapper) {
                this.parent.appendChild(elementWrapper);
                // コンポーネント間に改行
                const spacer = document.createElement("div");
                spacer.style.height = "4px";
                this.parent.appendChild(spacer);
            }
        });
    }
    // DOMからJSON配列を復元
    serialize() {
        const result = [];
        this.parent.childNodes.forEach(node => {
            if (!(node instanceof HTMLElement))
                return;
            const objtype = node.dataset.objtype;
            if (!objtype)
                return;
            let obj = null;
            switch (objtype) {
                case "button":
                    obj = { objtype: "button", label: node.dataset.label };
                    if (node.dataset.url)
                        obj.url = node.dataset.url;
                    break;
                case "label":
                    obj = { objtype: "label", text: node.dataset.text };
                    break;
                case "audio":
                    obj = { objtype: "audio", src: node.dataset.src };
                    if (node.dataset.autoplay === "true")
                        obj.autoplay = true;
                    if (node.dataset.controls !== undefined)
                        obj.controls = node.dataset.controls === "true";
                    break;
                case "video":
                    obj = { objtype: "video", src: node.dataset.src };
                    if (node.dataset.autoplay === "true")
                        obj.autoplay = true;
                    if (node.dataset.controls !== undefined)
                        obj.controls = node.dataset.controls === "true";
                    if (node.dataset.width)
                        obj.width = parseInt(node.dataset.width);
                    if (node.dataset.height)
                        obj.height = parseInt(node.dataset.height);
                    break;
                case "image":
                    obj = { objtype: "image", src: node.dataset.src };
                    if (node.dataset.width)
                        obj.width = parseInt(node.dataset.width);
                    if (node.dataset.height)
                        obj.height = parseInt(node.dataset.height);
                    if (node.dataset.fitParent === "true")
                        obj.fitParent = true;
                    break;
                case "youtube":
                    obj = {
                        objtype: "youtube",
                        videoId: node.dataset.videoId
                    };
                    if (node.dataset.autoplay === "true")
                        obj.autoplay = true;
                    if (node.dataset.controls !== undefined)
                        obj.controls = node.dataset.controls === "true";
                    if (node.dataset.loop === "true")
                        obj.loop = true;
                    if (node.dataset.width)
                        obj.width = parseInt(node.dataset.width);
                    if (node.dataset.height)
                        obj.height = parseInt(node.dataset.height);
                    if (node.dataset.fitParent === "true")
                        obj.fitParent = true;
                    break;
                case "xtwitter":
                    obj = {
                        objtype: "xtwitter",
                        tweetId: node.dataset.tweetId
                    };
                    if (node.dataset.theme)
                        obj.theme = node.dataset.theme;
                    if (node.dataset.align)
                        obj.align = node.dataset.align;
                    break;
                default:
                    return; // 不明な objtype は無視
            }
            if (obj)
                result.push(obj);
        });
        return result;
    }
}
