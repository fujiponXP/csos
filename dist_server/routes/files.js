import { Router } from "express";
import { resolve } from "node:path";
import { FileListJsonBuilder } from "../FileListJsonBuilder.js";
export const filesRouter = Router();
const builder = new FileListJsonBuilder();
// ベースディレクトリ（ここより外は見せない）
const BASE_DIR = resolve(process.cwd());
filesRouter.get("/", async (req, res) => {
    try {
        const dirParam = req.query.dir;
        if (typeof dirParam !== "string") {
            return res.status(400).json({ error: "dir query is required" });
        }
        const targetDir = resolve(BASE_DIR, dirParam);
        // 🔒 ディレクトリトラバーサル対策
        if (!targetDir.startsWith(BASE_DIR)) {
            return res.status(403).json({ error: "Access denied" });
        }
        const files = await builder.build(targetDir);
        res.json(files);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to read directory" });
    }
});
