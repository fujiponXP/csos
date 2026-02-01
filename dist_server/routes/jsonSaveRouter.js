// ./routes/jsonSaveRouter.ts
import { Router } from "express";
import { resolve } from "node:path";
import { writeFile, mkdir } from "node:fs/promises";
export const jsonSaveRouter = Router();
// ベースディレクトリ（ここより外は触らせない）
const BASE_DIR = resolve(process.cwd());
jsonSaveRouter.post("/", async (req, res) => {
    try {
        const fileParam = req.query.file;
        if (typeof fileParam !== "string") {
            return res.status(400).json({ error: "file query is required" });
        }
        const targetFile = resolve(BASE_DIR, fileParam);
        // 🔒 ディレクトリトラバーサル対策
        if (!targetFile.startsWith(BASE_DIR)) {
            return res.status(403).json({ error: "Access denied" });
        }
        const jsonData = req.body;
        if (jsonData === undefined) {
            return res.status(400).json({ error: "JSON body is required" });
        }
        // JSONとしてシリアライズ可能かチェック
        let jsonText;
        try {
            jsonText = JSON.stringify(jsonData, null, 2);
        }
        catch {
            return res.status(400).json({ error: "Invalid JSON data" });
        }
        // ディレクトリが無ければ作る
        await mkdir(resolve(targetFile, ".."), { recursive: true });
        // 💾 保存
        await writeFile(targetFile, jsonText, "utf-8");
        res.json({ ok: true });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to save file" });
    }
});
