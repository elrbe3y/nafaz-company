import AdminMessagesTable from "@/components/AdminMessagesTable";
import AdminProjectsManager from "@/components/AdminProjectsManager";
import { getMessages } from "@/lib/messages";
import { getProjects } from "@/lib/projects";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const messages = await getMessages();
  const projects = await getProjects();

  return (
    <main className="min-h-screen bg-slate-50 px-5 py-10 text-slate-800 sm:px-8">
      <div className="mx-auto w-full max-w-5xl">
        <h1 className="text-3xl font-bold text-slate-900">لوحة رسائل العملاء</h1>
        <p className="mt-2 text-sm text-slate-600">يتم عرض أحدث الرسائل أولًا.</p>
        <AdminMessagesTable messages={messages} />
        <AdminProjectsManager initialProjects={projects} />
      </div>
    </main>
  );
}
