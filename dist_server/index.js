import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { FileListJsonBuilder } from "./FileListJsonBuilder.js";
const app = express();
const port = 3000;
// ===== ESM 用 __dirname =====
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// ===== paths =====
const WEB_ROOT = path.join(__dirname, "../src_web");
const STATIC_ROOT = path.join(WEB_ROOT, "static");
const BASE_DIR = __dirname;
// ===== builder =====
const builder = new FileListJsonBuilder();
// ===== static =====
// /static → src_web/static
app.use("/static", express.static(STATIC_ROOT));
// ルートは index.html だけを返す
app.get("/", (_req, res) => {
    res.sendFile(path.join(WEB_ROOT, "index.html"));
});
// （保険）/index.html でも同じものを返す
app.get("/index.html", (_req, res) => {
    res.sendFile(path.join(WEB_ROOT, "index.html"));
});
// ===== API =====
app.get("/api/files", async (_req, res) => {
    try {
        const files = await builder.build(BASE_DIR);
        res.json(files);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to read src directory" });
    }
});
// ===== start =====
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
