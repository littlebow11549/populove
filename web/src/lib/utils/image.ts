/**
 * 用戶端圖片處理：把上傳的檔案縮到合理尺寸並轉成 data URL。
 *
 * 目前後台先以 data URL 暫存（接 Supabase Storage 後改為上傳取得網址）。
 * 縮圖是為了避免 base64 過大撐爆 localStorage。
 */

function readAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("圖片載入失敗"));
    image.src = src;
  });
}

export async function resizeImageToDataUrl(
  file: File,
  maxSize = 900,
  quality = 0.9,
): Promise<string> {
  const original = await readAsDataUrl(file);
  // GIF 直接保留原檔，避免重繪掉動畫。
  if (file.type === "image/gif") return original;

  const image = await loadImage(original);
  const scale = Math.min(1, maxSize / Math.max(image.width, image.height));
  const width = Math.round(image.width * scale);
  const height = Math.round(image.height * scale);

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return original;
  ctx.drawImage(image, 0, 0, width, height);
  return canvas.toDataURL("image/jpeg", quality);
}
