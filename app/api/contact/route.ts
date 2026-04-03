import { addMessage } from "@/lib/messages";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const formData = await request.formData();

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const address = String(formData.get("address") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  const langInput = String(formData.get("lang") ?? "ar").trim();
  const lang = langInput === "en" ? "en" : "ar";

  if (!name || !email || !phone || !address || !message) {
    return NextResponse.json(
      { error: "Missing required fields." },
      { status: 400 }
    );
  }

  await addMessage({
    name,
    email,
    phone,
    address,
    message,
    lang,
  });

  const redirectTo = lang === "en" ? "/en?sent=1#contact" : "/?sent=1#contact";
  return NextResponse.redirect(new URL(redirectTo, request.url), 303);
}
