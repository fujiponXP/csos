import express from "express";
import path from "node:path";
import { FileListJsonBuilder } from "./FileListJsonBuilder.js";
const app = express();
const port = 3000;
const builder = new FileListJsonBuilder();
const BASE_DIR = path.resolve(process.cwd(), "src");
// =====================================
// 静的ファイル配信 (UIClass.js をブラウザから読めるようにする)
// =====================================
app.use("/static", express.static(BASE_DIR));
// / にアクセスしたら HTML を返す
app.get("/", async (_req, res) => {
    try {
        const files = await builder.build(BASE_DIR);
        const html = `<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<title>File List Window</title>
<style>
  body { font-family: sans-serif; padding: 20px; background:#f0f0f0; }
  ul { list-style: none; padding-left:0; margin:0; }
  li { padding: 2px 5px; }
  .directory { font-weight: bold; }
  .file { color: #555; }

  /* Window CSS */
  .window {
    border: 1px solid #999;
    background: #fff;
    width: 300px;
    margin-bottom: 10px;
    box-shadow: 2px 2px 10px rgba(0,0,0,0.2);
  }
  .titlebar {
    background:#007acc;
    color:#fff;
    padding:5px;
    display:flex;
    justify-content: space-between;
    align-items:center;
    cursor: move;
  }
  .titlebar .button-container button {
    margin-left: 5px;
    cursor: pointer;
  }
  .content {
    padding:5px;
  }
  .statusbar {
    background:#eee;
    padding:3px 5px;
    font-size:0.9em;
    color:#333;
  }
</style>
</head>
<body>
<h1>src 配下のファイルリスト（Window表示）</h1>
<div id="app"></div>

<!-- UIClass.js をモジュールとして読み込む -->
<script type="module">
import { Window } from "/static/UIClass.js";

const files = ${JSON.stringify(files)};

const win = new Window("src 配下ファイル");
win.setContent('<ul>' + files.map(f => '<li class="' + f.type + '">' + f.name + (f.ext ?? '') + '</li>').join('') + '</ul>');
win.setStatus("Ready");
win.show(document.getElementById("app"));
</script>
</body>
</html>`;
        res.send(html);
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Failed to read src directory");
    }
});
// サーバ起動
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map