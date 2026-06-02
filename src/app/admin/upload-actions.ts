"use server";

import { put } from "@vercel/blob";
import { requireAdmin } from "@/lib/auth/guard";

export type UploadResult = { url?: string; error?: string };

const MAX_BYTES = 8 * 1024 * 1024; // 8 MB
const ALLOWED = ["image/jpeg", "image/png", "image/webp", "image/avif", "image/gif"];

export async function uploadImage(formData: FormData): Promise<UploadResult> {
  await requireAdmin();

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return { error: "Image storage isn't connected yet (Vercel Blob). Paste an image URL instead." };
  }

  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return { error: "No file selected." };
  }
  if (file.size > MAX_BYTES) {
    return { error: "Image is larger than 8 MB." };
  }
  if (!ALLOWED.includes(file.type)) {
    return { error: "Unsupported image type." };
  }

  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const safe = file.name.replace(/[^a-zA-Z0-9._-]/g, "-").slice(0, 60);
  try {
    const blob = await put(`secundarian/${Date.now()}-${safe}.${ext}`, file, {
      access: "public",
      addRandomSuffix: true,
    });
    return { url: blob.url };
  } catch (e) {
    return { error: `Upload failed: ${(e as Error).message}` };
  }
}
