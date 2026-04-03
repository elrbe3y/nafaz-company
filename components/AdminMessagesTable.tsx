"use client";

import { useMemo, useState } from "react";
import type { ContactMessage } from "@/lib/messages";

type AdminMessagesTableProps = {
  messages: ContactMessage[];
};

export default function AdminMessagesTable({ messages }: AdminMessagesTableProps) {
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(null);

  const selectedMessage = useMemo(
    () => messages.find((item) => item.id === selectedMessageId) ?? null,
    [messages, selectedMessageId]
  );

  return (
    <>
      <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="grid grid-cols-12 gap-3 border-b border-slate-200 bg-slate-100 px-4 py-3 text-xs font-semibold text-slate-700 sm:px-6 sm:text-sm">
          <span className="col-span-2">الاسم</span>
          <span className="col-span-2">البريد</span>
          <span className="col-span-2">الهاتف</span>
          <span className="col-span-2">العنوان</span>
          <span className="col-span-1">اللغة</span>
          <span className="col-span-2">التاريخ</span>
          <span className="col-span-1">عرض</span>
        </div>

        {messages.length === 0 ? (
          <div className="px-4 py-10 text-center text-sm text-slate-500 sm:px-6">
            لا توجد رسائل حتى الآن.
          </div>
        ) : (
          <ul className="divide-y divide-slate-200">
            {messages.map((item) => (
              <li key={item.id} className="grid grid-cols-12 items-center gap-3 px-4 py-4 text-xs sm:px-6 sm:text-sm">
                <p className="col-span-2 font-medium text-slate-900">{item.name}</p>
                <p className="col-span-2 truncate text-slate-700">{item.email}</p>
                <p className="col-span-2 truncate text-slate-700">{item.phone || "-"}</p>
                <p className="col-span-2 truncate text-slate-700">{item.address || "-"}</p>
                <p className="col-span-1 uppercase text-slate-600">{item.lang}</p>
                <p className="col-span-2 text-slate-500">
                  {new Date(item.createdAt).toLocaleString("en-GB")}
                </p>
                <div className="col-span-1">
                  <button
                    type="button"
                    onClick={() => setSelectedMessageId(item.id)}
                    className="rounded-lg border border-blue-200 px-2 py-1 text-xs font-semibold text-blue-700 transition hover:bg-blue-50"
                  >
                    عرض
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {selectedMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
          <div className="w-full max-w-xl rounded-2xl bg-white p-5 shadow-xl sm:p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">تفاصيل الرسالة</h2>
              <button
                type="button"
                onClick={() => setSelectedMessageId(null)}
                className="rounded-md border border-slate-300 px-3 py-1 text-xs text-slate-700 transition hover:bg-slate-100"
              >
                إغلاق
              </button>
            </div>

            <div className="mt-4 space-y-2 text-sm text-slate-700">
              <p><span className="font-semibold text-slate-900">الاسم:</span> {selectedMessage.name}</p>
              <p><span className="font-semibold text-slate-900">البريد:</span> {selectedMessage.email}</p>
              <p><span className="font-semibold text-slate-900">الهاتف:</span> {selectedMessage.phone || "-"}</p>
              <p><span className="font-semibold text-slate-900">العنوان:</span> {selectedMessage.address || "-"}</p>
              <p><span className="font-semibold text-slate-900">اللغة:</span> {selectedMessage.lang}</p>
              <p><span className="font-semibold text-slate-900">التاريخ:</span> {new Date(selectedMessage.createdAt).toLocaleString("en-GB")}</p>
            </div>

            <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm leading-7 text-slate-800">
              {selectedMessage.message}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
