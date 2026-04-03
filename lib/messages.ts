import { promises as fs } from "fs";
import path from "path";

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  message: string;
  lang: "ar" | "en";
  createdAt: string;
};

const dataDir = path.join(process.cwd(), "data");
const messagesFile = path.join(dataDir, "messages.json");

async function ensureStore() {
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }

  try {
    await fs.access(messagesFile);
  } catch {
    await fs.writeFile(messagesFile, "[]", "utf8");
  }
}

export async function getMessages(): Promise<ContactMessage[]> {
  await ensureStore();

  const raw = await fs.readFile(messagesFile, "utf8");
  try {
    const parsed = JSON.parse(raw) as Partial<ContactMessage>[];
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.map((item) => ({
      id: String(item.id ?? ""),
      name: String(item.name ?? ""),
      email: String(item.email ?? ""),
      phone: String(item.phone ?? ""),
      address: String(item.address ?? ""),
      message: String(item.message ?? ""),
      lang: item.lang === "en" ? "en" : "ar",
      createdAt: String(item.createdAt ?? new Date().toISOString()),
    }));
  } catch {
    return [];
  }
}

export async function addMessage(
  payload: Omit<ContactMessage, "id" | "createdAt">
): Promise<void> {
  const current = await getMessages();

  const message: ContactMessage = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    createdAt: new Date().toISOString(),
    ...payload,
  };

  current.unshift(message);
  await fs.writeFile(messagesFile, JSON.stringify(current, null, 2), "utf8");
}
