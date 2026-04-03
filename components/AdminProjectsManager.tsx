"use client";

import Image from "next/image";
import { useState } from "react";
import type { ProjectRecord } from "@/lib/projects";

type AdminProjectsManagerProps = {
  initialProjects: ProjectRecord[];
};

type ProjectFormState = {
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  stack: string;
  image: string;
  projectUrl: string;
  published: boolean;
};

const initialForm: ProjectFormState = {
  titleAr: "",
  titleEn: "",
  descriptionAr: "",
  descriptionEn: "",
  stack: "",
  image: "/mockups/mockup-card-1.svg",
  projectUrl: "",
  published: true,
};

export default function AdminProjectsManager({ initialProjects }: AdminProjectsManagerProps) {
  const [projects, setProjects] = useState<ProjectRecord[]>(initialProjects);
  const [form, setForm] = useState<ProjectFormState>(initialForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [status, setStatus] = useState<string>("");
  const [busy, setBusy] = useState(false);
  const [uploading, setUploading] = useState(false);

  const onChange = <K extends keyof ProjectFormState>(key: K, value: ProjectFormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const resetForm = () => {
    setForm(initialForm);
    setEditingId(null);
  };

  const uploadImage = async (file: File | null) => {
    if (!file) {
      return;
    }

    setUploading(true);
    setStatus("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorBody = (await response.json().catch(() => null)) as
          | { error?: string }
          | null;
        throw new Error(errorBody?.error || "فشل رفع الصورة.");
      }

      const data = (await response.json()) as { path: string };
      setForm((prev) => ({ ...prev, image: data.path }));
      setStatus("تم رفع الصورة بنجاح.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "حدث خطأ أثناء رفع الصورة.");
    } finally {
      setUploading(false);
    }
  };

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setBusy(true);
    setStatus("");

    const payload = {
      titleAr: form.titleAr.trim(),
      titleEn: form.titleEn.trim(),
      descriptionAr: form.descriptionAr.trim(),
      descriptionEn: form.descriptionEn.trim(),
      stack: form.stack.trim(),
      image: form.image.trim() || "/mockups/mockup-card-1.svg",
      projectUrl: form.projectUrl.trim(),
      published: form.published,
    };

    if (!payload.titleAr || !payload.titleEn || !payload.descriptionAr || !payload.descriptionEn || !payload.stack) {
      setStatus("يرجى ملء كل الحقول المطلوبة.");
      setBusy(false);
      return;
    }

    try {
      if (editingId) {
        const response = await fetch(`/api/projects/${editingId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error("تعذر تعديل المشروع.");
        }

        const data = (await response.json()) as { project: ProjectRecord };
        setProjects((prev) => prev.map((item) => (item.id === editingId ? data.project : item)));
        setStatus("تم تعديل المشروع.");
      } else {
        const response = await fetch("/api/projects", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error("تعذر إضافة المشروع.");
        }

        const data = (await response.json()) as { project: ProjectRecord };
        setProjects((prev) => [data.project, ...prev]);
        setStatus("تمت إضافة مشروع جديد.");
      }

      resetForm();
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "حدث خطأ غير متوقع.");
    } finally {
      setBusy(false);
    }
  };

  const startEdit = (project: ProjectRecord) => {
    setEditingId(project.id);
    setForm({
      titleAr: project.titleAr,
      titleEn: project.titleEn,
      descriptionAr: project.descriptionAr,
      descriptionEn: project.descriptionEn,
      stack: project.stack,
      image: project.image,
      projectUrl: project.projectUrl,
      published: project.published,
    });
    setStatus("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const removeProject = async (id: string) => {
    const ok = window.confirm("هل أنت متأكد من حذف هذا المشروع؟");
    if (!ok) return;

    setBusy(true);
    setStatus("");

    try {
      const response = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      if (!response.ok) {
        throw new Error("تعذر حذف المشروع.");
      }

      setProjects((prev) => prev.filter((item) => item.id !== id));
      if (editingId === id) {
        resetForm();
      }
      setStatus("تم حذف المشروع.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "حدث خطأ غير متوقع.");
    } finally {
      setBusy(false);
    }
  };

  const togglePublished = async (project: ProjectRecord) => {
    setBusy(true);
    setStatus("");

    try {
      const response = await fetch(`/api/projects/${project.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ published: !project.published }),
      });

      if (!response.ok) {
        throw new Error("تعذر تغيير حالة النشر.");
      }

      const data = (await response.json()) as { project: ProjectRecord };
      setProjects((prev) => prev.map((item) => (item.id === project.id ? data.project : item)));
      setStatus("تم تحديث حالة النشر.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "حدث خطأ غير متوقع.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <h2 className="text-2xl font-bold text-slate-900">إدارة المشاريع</h2>
      <p className="mt-2 text-sm text-slate-600">يمكنك إضافة مشاريع جديدة، تعديلها، نشرها أو حذفها.</p>

      <form onSubmit={submit} className="mt-6 grid gap-3 sm:grid-cols-2">
        <input
          value={form.titleAr}
          onChange={(e) => onChange("titleAr", e.target.value)}
          placeholder="عنوان المشروع (AR)"
          className="rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500"
          required
        />
        <input
          value={form.titleEn}
          onChange={(e) => onChange("titleEn", e.target.value)}
          placeholder="Project title (EN)"
          className="rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500"
          required
        />
        <textarea
          value={form.descriptionAr}
          onChange={(e) => onChange("descriptionAr", e.target.value)}
          placeholder="وصف المشروع (AR)"
          className="rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 sm:col-span-2"
          rows={3}
          required
        />
        <textarea
          value={form.descriptionEn}
          onChange={(e) => onChange("descriptionEn", e.target.value)}
          placeholder="Project description (EN)"
          className="rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 sm:col-span-2"
          rows={3}
          required
        />
        <input
          value={form.stack}
          onChange={(e) => onChange("stack", e.target.value)}
          placeholder="Stack (e.g. Next.js, PostgreSQL)"
          className="rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500"
          required
        />
        <input
          value={form.image}
          onChange={(e) => onChange("image", e.target.value)}
          placeholder="Image path (e.g. /mockups/mockup-card-1.svg)"
          className="rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500"
          required
        />
        <input
          value={form.projectUrl}
          onChange={(e) => onChange("projectUrl", e.target.value)}
          placeholder="Project URL (e.g. https://...)"
          className="rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 sm:col-span-2"
        />
        <label className="flex items-center justify-between gap-3 rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-700">
          <span>{uploading ? "جاري رفع الصورة..." : "رفع صورة من الجهاز (حتى 2MB)"}</span>
          <input
            type="file"
            accept="image/*"
            disabled={uploading || busy}
            onChange={(e) => uploadImage(e.target.files?.[0] ?? null)}
            className="max-w-[190px] text-xs"
          />
        </label>
        <div className="sm:col-span-2">
          <p className="mb-2 text-xs text-slate-500">معاينة الصورة الحالية</p>
          <div className="relative h-36 w-full overflow-hidden rounded-xl border border-slate-200 bg-slate-50 sm:w-72">
            <Image
              src={form.image || "/mockups/mockup-card-1.svg"}
              alt="Project preview"
              fill
              className="object-cover"
            />
          </div>
        </div>

        <label className="inline-flex items-center gap-2 text-sm text-slate-700 sm:col-span-2">
          <input
            type="checkbox"
            checked={form.published}
            onChange={(e) => onChange("published", e.target.checked)}
            className="h-4 w-4"
          />
          نشر المشروع على الموقع
        </label>

        <div className="flex flex-wrap gap-2 sm:col-span-2">
          <button
            type="submit"
            disabled={busy}
            className="rounded-xl bg-blue-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
          >
            {editingId ? "حفظ التعديل" : "نشر مشروع جديد"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="rounded-xl border border-slate-300 px-5 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              إلغاء التعديل
            </button>
          )}
        </div>
      </form>

      {status && <p className="mt-3 text-sm text-blue-700">{status}</p>}

      <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200">
        <div className="grid grid-cols-12 gap-2 border-b border-slate-200 bg-slate-100 px-4 py-3 text-xs font-semibold text-slate-700 sm:text-sm">
          <span className="col-span-2">AR</span>
          <span className="col-span-2">EN</span>
          <span className="col-span-2">Stack</span>
          <span className="col-span-2">Image</span>
          <span className="col-span-1">Status</span>
          <span className="col-span-3">Actions</span>
        </div>

        <ul className="divide-y divide-slate-200 bg-white">
          {projects.map((project) => (
            <li key={project.id} className="grid grid-cols-12 items-center gap-2 px-4 py-3 text-xs sm:text-sm">
              <p className="col-span-2 truncate font-medium text-slate-900">{project.titleAr}</p>
              <p className="col-span-2 truncate text-slate-700">{project.titleEn}</p>
              <p className="col-span-2 truncate text-slate-700">{project.stack}</p>
              <p className="col-span-2 truncate text-slate-700">{project.image}</p>
              <p className="col-span-1">
                <span
                  className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                    project.published
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-slate-200 text-slate-700"
                  }`}
                >
                  {project.published ? "Live" : "Draft"}
                </span>
              </p>
              <div className="col-span-3 flex flex-wrap gap-1">
                <button
                  type="button"
                  onClick={() => startEdit(project)}
                  className="rounded-md border border-blue-200 px-2 py-1 text-[11px] font-semibold text-blue-700 transition hover:bg-blue-50"
                >
                  تعديل
                </button>
                <button
                  type="button"
                  onClick={() => togglePublished(project)}
                  className="rounded-md border border-amber-200 px-2 py-1 text-[11px] font-semibold text-amber-700 transition hover:bg-amber-50"
                >
                  {project.published ? "إخفاء" : "نشر"}
                </button>
                <button
                  type="button"
                  onClick={() => removeProject(project.id)}
                  className="rounded-md border border-rose-200 px-2 py-1 text-[11px] font-semibold text-rose-700 transition hover:bg-rose-50"
                >
                  حذف
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
