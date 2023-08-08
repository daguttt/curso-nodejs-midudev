import { readdir, stat } from "node:fs/promises";
import { join } from "node:path";

import { formatBytes } from "./utils.js";

const FOLDER_PATH = process.argv[2] ?? "./";

(async (folderPath) => {
  // Get files in folder
  let files;
  try {
    files = await readdir(folderPath);
  } catch (error) {
    console.error("Error ocuurred reading folder:", error);
    return process.exit(1);
  }

  // Extract each file stats
  const filesStats = files.map(async (file) => {
    const filePath = join(folderPath, file);

    let fileStats;
    try {
      fileStats = await stat(filePath);
    } catch (error) {
      console.error(`Error ocuurred reading the file ${filePath}`, error);
      return process.exit(1);
    }

    const isDirectory = fileStats.isDirectory();
    const prefix = isDirectory ? "d" : "-";
    const formattedSize = formatBytes(fileStats.size);
    const modifiedAt = fileStats.mtime;

    return {
      prefix,
      fileName: file,
      size: formattedSize,
      lastModifiedAt: modifiedAt,
    };
  });

  const resolvedFilesStats = await Promise.all(filesStats);

  const sortedModifiedDescFilesStats = resolvedFilesStats.sort((fileA, fileB) =>
    fileA.lastModifiedAt < fileB.lastModifiedAt ? 1 : -1
  );

  const filesLogLines = sortedModifiedDescFilesStats.map(
    ({ prefix, fileName, lastModifiedAt, size }) =>
      `${prefix} ${fileName.padEnd(25)} size: ${size.padEnd(
        10
      )} | ${lastModifiedAt.toLocaleString()}`
  );

  filesLogLines.forEach((fileStats) => console.log(fileStats));
})(FOLDER_PATH);
