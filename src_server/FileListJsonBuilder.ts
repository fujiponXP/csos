import { readdir, stat } from "node:fs/promises";
import { basename, extname, join } from "node:path";

export type FileEntryJson = {
  type: "file" | "directory";
  name: string;
  ext: string | null;
};

export class FileListJsonBuilder {
  /**
   * 指定ディレクトリ直下のファイル／ディレクトリを JSON 化
   */
  async build(dir: string): Promise<FileEntryJson[]> {
    const entries = await readdir(dir);
    const result: FileEntryJson[] = [];

    for (const entry of entries) {
      const fullPath = join(dir, entry);
      const stats = await stat(fullPath);

      if (stats.isDirectory()) {
        result.push({
          type: "directory",
          name: entry,
          ext: null
        });
      } else {
        const ext = extname(entry);
        result.push({
          type: "file",
          name: basename(entry, ext),
          ext: ext || null
        });
      }
    }

    return result;
  }
}
