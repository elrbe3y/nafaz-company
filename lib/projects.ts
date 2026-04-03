import { promises as fs } from "fs";
import path from "path";

export type ProjectRecord = {
  id: string;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  stack: string;
  image: string;
  projectUrl: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
};

const dataDir = path.join(process.cwd(), "data");
const projectsFile = path.join(dataDir, "projects.json");

const seedProjects: ProjectRecord[] = [
  {
    id: "proj-1",
    titleAr: "منصة عقارية فاخرة",
    titleEn: "Luxury Real Estate Platform",
    descriptionAr: "واجهة راقية وسريعة لإدارة العقارات والحجوزات.",
    descriptionEn: "A premium, fast interface for property management and bookings.",
    stack: "Next.js, PostgreSQL",
    image: "/mockups/mockup-card-1.svg",
    projectUrl: "https://nafaz-realestate.vercel.app/ar",
    published: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "proj-2",
    titleAr: "نظام إدارة سنتر تعليمي",
    titleEn: "Educational Center Management",
    descriptionAr: "متابعة الحضور، الجداول، والمدفوعات في لوحة واحدة.",
    descriptionEn: "Attendance, schedules, and payments in one operational dashboard.",
    stack: "Next.js, Node.js",
    image: "/mockups/mockup-card-2.svg",
    projectUrl: "https://www.youtube.com/watch?v=0hjwyQjED7o",
    published: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "proj-3",
    titleAr: "منصة تعليمية متكاملة",
    titleEn: "Integrated Learning Platform",
    descriptionAr: "بث محتوى، اختبارات، وتقارير أداء للطلاب.",
    descriptionEn: "Streaming lessons, assessments, and student performance analytics.",
    stack: "Node.js, PostgreSQL",
    image: "/mockups/mockup-card-3.svg",
    projectUrl: "https://lms-platform-fawn-eight.vercel.app/",
    published: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "proj-4",
    titleAr: "لوحة تشغيل أعمال",
    titleEn: "Business Operations Dashboard",
    descriptionAr: "تقارير لحظية ومؤشرات تساعدك على اتخاذ القرار.",
    descriptionEn: "Real-time reports and KPIs that support better decision making.",
    stack: "Tailwind, PHP",
    image: "/mockups/mockup-card-4.svg",
    projectUrl: "",
    published: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "proj-5",
    titleAr: "موقع تعريفي لشركة برمجية",
    titleEn: "A website introducing a software company",
    descriptionAr: "موقع تعريفي تصميم مخصص ثابت لشركة برمجيات سريع الاستجابه بسيط",
    descriptionEn: "A static, custom-designed, responsive, and simple website for a software company.",
    stack: "Html , css , javascript",
    image: "/uploads/1773611440265-screenshot-2026-03-15-234357.png",
    projectUrl: "https://bluetech-6ffaf.web.app",
    published: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

async function ensureStore() {
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }

  try {
    await fs.access(projectsFile);
  } catch {
    await fs.writeFile(projectsFile, JSON.stringify(seedProjects, null, 2), "utf8");
  }
}

export async function getProjects(): Promise<ProjectRecord[]> {
  await ensureStore();

  const raw = await fs.readFile(projectsFile, "utf8");
  try {
    const parsed = JSON.parse(raw) as Partial<ProjectRecord>[];
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.map((item) => ({
      id: String(item.id ?? `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`),
      titleAr: String(item.titleAr ?? ""),
      titleEn: String(item.titleEn ?? ""),
      descriptionAr: String(item.descriptionAr ?? ""),
      descriptionEn: String(item.descriptionEn ?? ""),
      stack: String(item.stack ?? ""),
      image: String(item.image ?? "/mockups/mockup-card-1.svg"),
      projectUrl: String(item.projectUrl ?? ""),
      published: Boolean(item.published),
      createdAt: String(item.createdAt ?? new Date().toISOString()),
      updatedAt: String(item.updatedAt ?? new Date().toISOString()),
    }));
  } catch {
    return [];
  }
}

async function saveProjects(projects: ProjectRecord[]) {
  await ensureStore();
  await fs.writeFile(projectsFile, JSON.stringify(projects, null, 2), "utf8");
}

export async function addProject(
  payload: Omit<ProjectRecord, "id" | "createdAt" | "updatedAt">
): Promise<ProjectRecord> {
  const current = await getProjects();

  const project: ProjectRecord = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...payload,
  };

  current.unshift(project);
  await saveProjects(current);
  return project;
}

export async function updateProject(
  id: string,
  patch: Partial<Omit<ProjectRecord, "id" | "createdAt" | "updatedAt">>
): Promise<ProjectRecord | null> {
  const current = await getProjects();
  const index = current.findIndex((item) => item.id === id);

  if (index === -1) {
    return null;
  }

  const updated: ProjectRecord = {
    ...current[index],
    ...patch,
    updatedAt: new Date().toISOString(),
  };

  current[index] = updated;
  await saveProjects(current);
  return updated;
}

export async function deleteProject(id: string): Promise<boolean> {
  const current = await getProjects();
  const next = current.filter((item) => item.id !== id);

  if (next.length === current.length) {
    return false;
  }

  await saveProjects(next);
  return true;
}

export async function getPublishedProjectsByLang(lang: "ar" | "en") {
  const projects = await getProjects();

  return projects
    .filter((item) => item.published)
    .map((item) => ({
      id: item.id,
      title: lang === "ar" ? item.titleAr : item.titleEn,
      description: lang === "ar" ? item.descriptionAr : item.descriptionEn,
      stack: item.stack,
      image: item.image,
      projectUrl: item.projectUrl,
    }));
}
