import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { FileListJsonBuilder } from "./FileListJsonBuilder.js";
import { fileContentRouter } from "./routes/fileContentRouter.js";
import { jsonSaveRouter } from "./routes/jsonSaveRouter.js";
const app = express();
const port = 3000;
// ===== ESM 用 __dirname =====
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// ===== paths =====
const WEB_ROOT = path.join(__dirname, "../src_web");
const STATIC_ROOT = path.join(WEB_ROOT, "static");
const DATA_ROOT = path.join(__dirname, "data");
// ===== builder =====
const builder = new FileListJsonBuilder();
// ===== middleware =====
app.use(express.json());
// ===== static =====
// /static → src_web/static
app.use("/static", express.static(STATIC_ROOT));
// /audio → src_web/audio
const AUDIO_ROOT = path.join(WEB_ROOT, "audio");
app.use("/audio", express.static(AUDIO_ROOT));
console.log("WEB_ROOT =", WEB_ROOT);
console.log("STATIC_ROOT =", STATIC_ROOT);
console.log("DATA_ROOT =", DATA_ROOT);
// ===== ルート =====
app.get("/", (_req, res) => {
    console.log("GET /"); // ルートアクセス確認
    res.sendFile(path.join(WEB_ROOT, "index.html"));
});
app.get("/index.html", (_req, res) => {
    console.log("GET /index.html");
    res.sendFile(path.join(WEB_ROOT, "index.html"));
});
// ===== API: ファイルリスト =====
app.get("/api/files", async (req, res) => {
    console.log("GET /api/files", req.query);
    try {
        const dirParam = req.query.dir;
        let targetDir = DATA_ROOT;
        if (typeof dirParam === "string") {
            // 先頭スラッシュやバックスラッシュを削除して安全に解決
            const cleanDir = dirParam.replace(/^[/\\]+/, "");
            targetDir = path.resolve(DATA_ROOT, cleanDir);
            console.log("dirParam =", dirParam);
            console.log("cleanDir =", cleanDir);
            console.log("targetDir =", targetDir);
        }
        // ディレクトリトラバーサル対策
        if (!targetDir.startsWith(DATA_ROOT)) {
            return res.status(403).json({ error: "Access denied" });
        }
        const files = await builder.build(targetDir);
        console.log("Files returned:", files.map(f => f.name));
        res.json(files);
    }
    catch (err) {
        console.error("Error in /api/files:", err);
        res.status(500).json({ error: "Failed to read directory" });
    }
});
// ===== API: JSON file load/save =====
app.use("/api/file-load", fileContentRouter);
app.use("/api/file-save", jsonSaveRouter);
// ===== start =====
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
