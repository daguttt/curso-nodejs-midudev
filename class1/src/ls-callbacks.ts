import { readdir, stat } from "node:fs";
import { join } from "node:path";

const FOLDER = process.argv[2] ?? "./";

readdir(FOLDER, (err, files) => {
  if (err) {
    console.error("Error ocuurred reading folder", err);
    return process.exit(1);
  }

  files.forEach((file) => {
    stat(join(FOLDER, file), (err, stats) => {
      if (err) {
        console.error("Error ocuurred reading file", err);
        return process.exit(1);
      }

      const isDirectory = stats.isDirectory();
      const prefix = isDirectory ? "d" : "-";
      const modifiedAt = stats.mtime.toLocaleString();

      console.log(`${prefix} ${file.padEnd(20)} ${modifiedAt}`);
    });
  });
});
