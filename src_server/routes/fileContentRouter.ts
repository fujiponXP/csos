// ./routes/fileContentRouter.ts
import { Router } from "express";
import { resolve } from "node:path";
import { readFile } from "node:fs/promises";

export const fileContentRouter = Router();

// ベースディレクトリ（ここより外は見せない）
const BASE_DIR = resolve(process.cwd());

fileContentRouter.get("/", async (req, res) => {
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

    // ファイル内容を読み込む
    const content = await readFile(targetFile, "utf-8");

    // JSONとしてパース可能かチェック
    let json;
    try {
      json = JSON.parse(content);
    } catch {
      return res.status(400).json({ error: "File is not valid JSON" });
    }

    res.json(json);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to read file" });
  }
});
