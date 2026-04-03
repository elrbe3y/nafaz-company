import { deleteProject, updateProject } from "@/lib/projects";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

type Params = {
  params: { id: string };
};

export async function PATCH(request: Request, { params }: Params) {
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

  const patch = {
    ...(body.titleAr !== undefined ? { titleAr: String(body.titleAr).trim() } : {}),
    ...(body.titleEn !== undefined ? { titleEn: String(body.titleEn).trim() } : {}),
    ...(body.descriptionAr !== undefined
      ? { descriptionAr: String(body.descriptionAr).trim() }
      : {}),
    ...(body.descriptionEn !== undefined
      ? { descriptionEn: String(body.descriptionEn).trim() }
      : {}),
    ...(body.stack !== undefined ? { stack: String(body.stack).trim() } : {}),
    ...(body.image !== undefined ? { image: String(body.image).trim() } : {}),
    ...(body.projectUrl !== undefined ? { projectUrl: String(body.projectUrl).trim() } : {}),
    ...(body.published !== undefined ? { published: Boolean(body.published) } : {}),
  };

  const updated = await updateProject(params.id, patch);

  if (!updated) {
    return NextResponse.json({ error: "Project not found." }, { status: 404 });
  }

  revalidatePath("/");
  revalidatePath("/en");

  return NextResponse.json({ project: updated });
}

export async function DELETE(_request: Request, { params }: Params) {
  const ok = await deleteProject(params.id);

  if (!ok) {
    return NextResponse.json({ error: "Project not found." }, { status: 404 });
  }

  revalidatePath("/");
  revalidatePath("/en");

  return NextResponse.json({ success: true });
}
