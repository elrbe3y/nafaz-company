import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";
import sharp from "sharp";

const uploadDir = path.join(process.cwd(), "public", "uploads");
const MAX_FILE_SIZE = 2 * 1024 * 1024;
const ALLOWED_TYPES = new Set([
  "image/png",
  "image/jpeg",
  "image/webp",
  "image/gif",
  "image/svg+xml",
]);

function sanitizeFileName(name: string) {
  return name.replace(/[^a-zA-Z0-9._-]/g, "-").toLowerCase();
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided." }, { status: 400 });
  }

  if (!ALLOWED_TYPES.has(file.type)) {
    return NextResponse.json(
      { error: "Unsupported file type. Use png, jpg, webp, gif, or svg." },
      { status: 400 }
    );
  }

  if (file.size > MAX_FILE_SIZE) {
    return NextResponse.json(
      { error: "File too large. Maximum allowed size is 2MB." },
      { status: 400 }
    );
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  await fs.mkdir(uploadDir, { recursive: true });

  const originalExtension = path.extname(file.name) || ".png";
  const baseName = sanitizeFileName(path.basename(file.name, originalExtension));

  if (file.type === "image/svg+xml" || file.type === "image/gif") {
    const filename = `${Date.now()}-${baseName}${originalExtension}`;
    const outputPath = path.join(uploadDir, filename);
    await fs.writeFile(outputPath, buffer);

    return NextResponse.json({ path: `/uploads/${filename}` }, { status: 201 });
  }

  const optimizedBuffer = await sharp(buffer)
    .rotate()
    .resize({ width: 1600, withoutEnlargement: true })
    .webp({ quality: 78 })
    .toBuffer();

  const filename = `${Date.now()}-${baseName}.webp`;
  const outputPath = path.join(uploadDir, filename);
  await fs.writeFile(outputPath, optimizedBuffer);

  return NextResponse.json({ path: `/uploads/${filename}` }, { status: 201 });
}
