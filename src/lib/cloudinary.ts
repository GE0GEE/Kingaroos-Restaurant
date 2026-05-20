// ─── Cloudinary Upload Utility ────────────────────────────────────────────────
// Uploads images directly from the browser to Cloudinary using an unsigned
// upload preset (no API secret in client code — best practice).
// On success, returns the secure_url which can be saved to Firestore.
//
// Mobile-friendly:
//   • Accepts iPhone HEIC/HEIF photos (Cloudinary auto-converts on upload)
//   • Pre-compresses files > 4 MB to keep mobile uploads fast on slow networks
//   • Generous timeout (3 min) for slow cellular connections
//   • Tolerates intermittent connectivity with descriptive error messages

import imageCompression from "browser-image-compression";

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME as string | undefined;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET as string | undefined;
const DEFAULT_FOLDER = (import.meta.env.VITE_CLOUDINARY_FOLDER as string | undefined) || "kingaroos";

export const isCloudinaryConfigured = (): boolean => !!(CLOUD_NAME && UPLOAD_PRESET);

export interface CloudinaryUploadResult {
  url: string;
  publicId: string;
  width: number;
  height: number;
  format: string;
  bytes: number;
}

export interface UploadOptions {
  folder?: string;
  onProgress?: (percent: number) => void;
  /** Skip client-side compression even for very large files. Default: false. */
  skipPreCompress?: boolean;
}

// Modern phone photos (iPhone, Pixel, Samsung) range from 3–15 MB; 200 MP cameras
// can hit ~30 MB. We accept up to 30 MB to comfortably cover all phones.
const MAX_BYTES = 30 * 1024 * 1024;
// Files larger than this get pre-compressed in the browser before upload.
// Keeps mobile uploads under 5–10 s on a 4G connection.
const PRE_COMPRESS_THRESHOLD_BYTES = 4 * 1024 * 1024;

/**
 * Returns true for any browser-recognised image (image/jpeg, image/png, image/webp,
 * image/heic, image/heif, image/gif, etc.). Some mobile browsers leave file.type
 * empty for HEIC — we then fall back to the filename extension.
 */
function isImageFile(file: File): boolean {
  if (file.type && file.type.startsWith("image/")) return true;
  const name = file.name.toLowerCase();
  return /\.(jpe?g|png|webp|gif|heic|heif|avif|bmp|tiff?)$/.test(name);
}

/**
 * Pre-compress a large image in the browser (off-main-thread via web worker).
 * Returns the original file unchanged if compression fails or isn't needed.
 * HEIC files are skipped — the browser-image-compression library can't decode
 * them, but Cloudinary handles HEIC natively on the server.
 */
async function maybePreCompress(file: File): Promise<File> {
  if (file.size <= PRE_COMPRESS_THRESHOLD_BYTES) return file;
  const lower = file.name.toLowerCase();
  if (lower.endsWith(".heic") || lower.endsWith(".heif")) return file;
  try {
    const compressed = await imageCompression(file, {
      maxSizeMB: 2,
      maxWidthOrHeight: 2400,
      useWebWorker: true,
      initialQuality: 0.85,
    });
    return compressed instanceof File
      ? compressed
      : new File([compressed], file.name, { type: compressed.type || file.type });
  } catch (err) {
    console.warn("[Cloudinary] Pre-compression failed, uploading original:", err);
    return file;
  }
}

/**
 * Upload a single image file to Cloudinary. Returns the secure URL plus metadata.
 * Throws on validation or network errors with a helpful message.
 */
export async function uploadToCloudinary(
  file: File,
  options: UploadOptions = {}
): Promise<CloudinaryUploadResult> {
  if (!isCloudinaryConfigured()) {
    throw new Error(
      "Cloudinary is not configured. Set VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET in your .env"
    );
  }

  // Client-side validation
  if (!isImageFile(file)) {
    throw new Error("Only image files are allowed.");
  }
  if (file.size > MAX_BYTES) {
    throw new Error(
      `File too large (${(file.size / 1024 / 1024).toFixed(1)} MB). Maximum is ${(MAX_BYTES / 1024 / 1024).toFixed(0)} MB.`
    );
  }

  // Pre-compress big phone photos so the upload completes quickly on cellular.
  const fileToUpload = options.skipPreCompress ? file : await maybePreCompress(file);

  const formData = new FormData();
  formData.append("file", fileToUpload);
  formData.append("upload_preset", UPLOAD_PRESET!);
  formData.append("folder", options.folder ?? DEFAULT_FOLDER);

  // XHR is used (not fetch) so we can report upload progress.
  return new Promise<CloudinaryUploadResult>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`);
    // Mobile networks can be slow — give the upload up to 3 minutes before timing out.
    xhr.timeout = 180_000;

    xhr.upload.addEventListener("progress", (e) => {
      if (e.lengthComputable && options.onProgress) {
        options.onProgress(Math.round((e.loaded / e.total) * 100));
      }
    });

    xhr.addEventListener("load", () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const data = JSON.parse(xhr.responseText);
          if (!data.secure_url) {
            reject(new Error("Cloudinary response missing secure_url"));
            return;
          }
          resolve({
            url: data.secure_url,
            publicId: data.public_id,
            width: data.width,
            height: data.height,
            format: data.format,
            bytes: data.bytes,
          });
        } catch {
          reject(new Error("Invalid response from Cloudinary"));
        }
      } else {
        let msg = `Upload failed (status ${xhr.status})`;
        try {
          const err = JSON.parse(xhr.responseText);
          if (err?.error?.message) msg = err.error.message;
        } catch { /* ignore */ }
        reject(new Error(msg));
      }
    });

    xhr.addEventListener("error", () => {
      reject(new Error("Network error during upload. Please check your connection."));
    });
    xhr.addEventListener("timeout", () => {
      reject(new Error("Upload timed out. Try again on a stronger network."));
    });
    xhr.addEventListener("abort", () => {
      reject(new Error("Upload aborted."));
    });

    xhr.send(formData);
  });
}

/**
 * Returns a Cloudinary URL transformed for optimal delivery (auto format + quality
 * + optional resize). For non-Cloudinary URLs it returns the original unchanged.
 *
 * Use when displaying images to deliver smaller, faster files to the browser.
 */
export function getOptimizedCloudinaryUrl(
  url: string,
  opts: { width?: number; height?: number; quality?: "auto" | number } = {}
): string {
  if (!url || typeof url !== "string") return url;
  if (!url.includes("res.cloudinary.com") && !url.includes("/image/upload/")) return url;

  const transforms: string[] = [];
  if (opts.width) transforms.push(`w_${opts.width}`);
  if (opts.height) transforms.push(`h_${opts.height}`);
  transforms.push(`q_${opts.quality ?? "auto"}`);
  transforms.push("f_auto");
  transforms.push("c_limit"); // never upscale

  // Inject transforms after `/upload/` if not already present
  return url.replace(/\/upload\/(?!.*\bf_auto\b)/, `/upload/${transforms.join(",")}/`);
}
