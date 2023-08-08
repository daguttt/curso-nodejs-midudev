export function formatBytes(bytes = 0) {
  if (bytes === 0) return "0 Bytes";

  const KILOBYTE = 1024;
  const SIZES = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const sizeIndex = Math.floor(Math.log(bytes) / Math.log(KILOBYTE));

  const sizeSuffix = SIZES[sizeIndex];

  return `${parseFloat(
    (bytes / Math.pow(KILOBYTE, sizeIndex)).toFixed(2)
  )} ${sizeSuffix}`;
}