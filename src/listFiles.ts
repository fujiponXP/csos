import { readdir, stat } from "node:fs/promises";
import { join } from "node:path";

/**
 * 指定ディレクトリ配下のファイル一覧を再帰的に取得する
 */
export async function listFiles(
  dir: string,
  files: string[] = []
): Promise<string[]> {
  const entries = await readdir(dir);

  for (const entry of entries) {
    const fullPath = join(dir, entry);
    const fileStat = await stat(fullPath);

    if (fileStat.isDirectory()) {
      await listFiles(fullPath, files);
    } else {
      files.push(fullPath);
    }
  }

  return files;
}
