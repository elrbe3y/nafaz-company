import { addProject, getProjects } from "@/lib/projects";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function GET() {
  const projects = await getProjects();
  return NextResponse.json({ projects });
}

export async function POST(request: Request) {
  const body = (await request.json()) as {
    titleAr?: string;
    titleEn?: string;
    descriptionAr?: string;
    descriptionEn?: string;
    stack?: string;
    image?: string;
    projectUrl?: string;
    published?: boolean;
  };

  const titleAr = String(body.titleAr ?? "").trim();
  const titleEn = String(body.titleEn ?? "").trim();
  const descriptionAr = String(body.descriptionAr ?? "").trim();
  const descriptionEn = String(body.descriptionEn ?? "").trim();
  const stack = String(body.stack ?? "").trim();
  const image = String(body.image ?? "").trim() || "/mockups/mockup-card-1.svg";
  const projectUrl = String(body.projectUrl ?? "").trim();
  const published = Boolean(body.published);

  if (!titleAr || !titleEn || !descriptionAr || !descriptionEn || !stack) {
    return NextResponse.json(
      { error: "Missing required fields." },
      { status: 400 }
    );
  }

  const project = await addProject({
    titleAr,
    titleEn,
    descriptionAr,
    descriptionEn,
    stack,
    image,
    projectUrl,
    published,
  });

  revalidatePath("/");
  revalidatePath("/en");

  return NextResponse.json({ project }, { status: 201 });
}
