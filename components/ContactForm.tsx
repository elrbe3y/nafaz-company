"use client";

import { FormEvent, useState } from "react";

type Lang = "ar" | "en";

type ContactFormProps = {
  lang: Lang;
  labels: {
    inputName: string;
    inputEmail: string;
    inputPhone: string;
    inputAddress: string;
    inputMessage: string;
    send: string;
    sending: string;
    sentSuccess: string;
    sentFailed: string;
    unknownError: string;
  };
};

type FormStatus =
  | { type: "idle" }
  | { type: "loading"; message: string }
  | { type: "success"; message: string }
  | { type: "error"; message: string };

export default function ContactForm({ lang, labels }: ContactFormProps) {
  const [status, setStatus] = useState<FormStatus>({ type: "idle" });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setStatus({ type: "loading", message: labels.sending });

    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.append("access_key", "99cb1cd6-b4de-4111-9642-29311a50b00d");
    formData.append("subject", `New contact from ${lang === "ar" ? "نفذ" : "Nafaz"}`);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const payload = (await response.json()) as { success?: boolean; message?: string };

      if (response.ok && payload.success) {
        form.reset();
        setStatus({ type: "success", message: labels.sentSuccess });
        return;
      }

      setStatus({
        type: "error",
        message: payload.message ? `${labels.sentFailed} ${payload.message}` : labels.sentFailed,
      });
    } catch {
      setStatus({ type: "error", message: labels.unknownError });
    }
  }

  const alertClass =
    status.type === "success"
      ? "border-green-200 bg-green-50 text-green-700"
      : status.type === "error"
        ? "border-red-200 bg-red-50 text-red-700"
        : "border-blue-200 bg-blue-50 text-blue-700";

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2"
    >
      <input
        name="name"
        type="text"
        placeholder={labels.inputName}
        required
        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500"
      />
      <input
        name="email"
        type="email"
        placeholder={labels.inputEmail}
        required
        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500"
      />
      <input
        name="phone"
        type="tel"
        placeholder={labels.inputPhone}
        required
        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500"
      />
      <input
        name="address"
        type="text"
        placeholder={labels.inputAddress}
        required
        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500"
      />
      <textarea
        name="message"
        rows={5}
        placeholder={labels.inputMessage}
        required
        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500"
      />

      {status.type !== "idle" && (
        <p className={`rounded-xl border px-4 py-3 text-sm font-medium ${alertClass}`}>
          {status.message}
        </p>
      )}

      <button
        type="submit"
        disabled={status.type === "loading"}
        className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-80"
      >
        {status.type === "loading" ? labels.sending : labels.send}
      </button>
    </form>
  );
}
