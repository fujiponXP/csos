// ./ui/index.ts
import { Window } from "./src_web/static/ui/Window.js";
import { PopupMenu } from "./src_web/static/ui/PopupMenu.js";
import { JsonUIBuilder } from "./src_web/static/ui/JsonParser.js";
// ===============================
// スタートボタン作成
// ===============================
const startBtn = document.createElement("img");
startBtn.src = "/static/start_button.png";
startBtn.style.position = "absolute";
startBtn.style.left = "10px";
startBtn.style.top = "10px";
startBtn.style.width = "48px";
startBtn.style.height = "48px";
startBtn.style.cursor = "pointer";
document.body.appendChild(startBtn);
// ===============================
// ポップアップメニュー作成
// ===============================
const menu = new PopupMenu([
    {
        label: "設定",
        onClick: () => {
            alert("設定を開く（仮）");
        },
    },
    {
        label: "ファイルリスト",
        onClick: async () => {
            const res = await fetch("/api/files?dir=data");
            const files = await res.json();
            // ===============================
            // Window 本体と JsonUIBuilder
            // ===============================
            const contentDiv = document.createElement("div");
            const jsonBuilder = new JsonUIBuilder(contentDiv);
            const win = new Window("data 配下ファイル", jsonBuilder);
            win.setContent(contentDiv);
            // ===============================
            // ファイルリスト作成
            // ===============================
            const ul = document.createElement("ul");
            ul.style.listStyle = "none";
            ul.style.padding = "4px";
            ul.style.margin = "0";
            files.forEach((f) => {
                const li = document.createElement("li");
                li.textContent = f.name + (f.ext ?? "");
                li.className = f.type;
                li.style.padding = "2px 6px";
                li.style.cursor = f.type === "file" ? "pointer" : "default";
                // ファイルクリックで Window 内の JsonUIBuilder にデータを流す
                if (f.type === "file") {
                    li.addEventListener("click", () => {
                        const filePath = `data/${f.name}${f.ext ?? ""}`;
                        fetch(`/api/file-content?file=${encodeURIComponent(filePath)}`)
                            .then((r) => r.json())
                            .then((json) => {
                            jsonBuilder.build(json); // Window 内で JSON を解析してコンテンツ生成
                            win.setStatus("ファイル読み込み完了");
                        })
                            .catch(() => win.setStatus("ファイル読み込み失敗"));
                    });
                }
                ul.appendChild(li);
            });
            // ファイルリストも Window 内にセット
            contentDiv.appendChild(ul);
            win.setStatus("Ready");
            win.show(document.body);
        },
    },
    {
        label: "プログラム起動",
        onClick: () => {
            alert("プログラム起動（仮）");
        },
    },
]);
document.body.appendChild(menu.element);
// ===============================
// 左クリックでメニュー表示
// ===============================
startBtn.addEventListener("click", (e) => {
    const rect = startBtn.getBoundingClientRect();
    menu.show(rect.left, rect.bottom + 8);
});
// ===============================
// メニュー外クリックで閉じる
// ===============================
document.addEventListener("click", (e) => {
    if (!menu.element.contains(e.target) && e.target !== startBtn) {
        menu.hide();
    }
});
