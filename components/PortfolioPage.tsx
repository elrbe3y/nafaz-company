import Image from "next/image";
import type { ComponentType } from "react";
import {
  FiArrowLeft,
  FiArrowRight,
  FiBriefcase,
  FiCode,
  FiCpu,
  FiDatabase,
  FiExternalLink,
  FiGlobe,
  FiLayers,
  FiMail,
  FiMapPin,
  FiMessageCircle,
  FiMonitor,
  FiPhone,
  FiShoppingBag,
  FiUser,
} from "react-icons/fi";
import { getPublishedProjectsByLang } from "@/lib/projects";

type Lang = "ar" | "en";

type PortfolioPageProps = {
  lang: Lang;
};

const localized = {
  ar: {
    navHome: "الرئيسية",
    navProjects: "مشاريعي",
    navServices: "خدماتي",
    navContact: "اتصل بنا",
    requestQuote: "اطلب عرض سعر",
    heroBrand: "نَفِّذ.",
    heroTitleRest: " حلول برمجية مخصصة لأعمالك.",
    heroDesc: "نحول أفكارك إلى أنظمة ذكية، كود كاستوم، أداء عالمي.",
    heroPrimaryCta: "استكشف مشاريعي",
    heroSecondaryCta: "تواصل معنا",
    heroImageAlt: "واجهة موقع احترافية",
    projectsTitle: "أعمالنا المميزة",
    viewDetails: "شاهد التفاصيل",
    prev: "السابق",
    next: "التالي",
    servicesTitle: "ماذا نقدم؟",
    techTitle: "تقنياتنا",
    contactTitle: "تواصل معنا",
    contactInfoTitle: "معلومات الاتصال",
    inputName: "الاسم",
    inputEmail: "البريد الإلكتروني",
    inputPhone: "رقم الهاتف",
    inputAddress: "العنوان",
    inputMessage: "الرسالة",
    send: "إرسال",
    copyright: "© 2026 جميع الحقوق محفوظة",
    whatsappAria: "واتساب",
    logoAlt: "شعار نَفِّذ",
    langButton: "EN",
  },
  en: {
    navHome: "Home",
    navProjects: "Projects",
    navServices: "Services",
    navContact: "Contact",
    requestQuote: "Request a Quote",
    heroBrand: "Nafaz.",
    heroTitleRest: " Custom Software Solutions For Your Business.",
    heroDesc: "We turn your ideas into smart systems, custom code, and world-class performance.",
    heroPrimaryCta: "Explore Projects",
    heroSecondaryCta: "Contact Us",
    heroImageAlt: "Professional website mockup",
    projectsTitle: "Featured Work",
    viewDetails: "View Details",
    prev: "Previous",
    next: "Next",
    servicesTitle: "What We Offer",
    techTitle: "Our Technologies",
    contactTitle: "Contact Us",
    contactInfoTitle: "Contact Information",
    inputName: "Name",
    inputEmail: "Email",
    inputPhone: "Phone Number",
    inputAddress: "Address",
    inputMessage: "Message",
    send: "Send",
    copyright: "© 2026 All rights reserved",
    whatsappAria: "WhatsApp",
    logoAlt: "Nafaz logo",
    langButton: "AR",
  },
};

const servicesByLang = {
  ar: [
    {
      title: "مواقع شركات",
      description: "مواقع احترافية للشركات تعكس الهوية وتعرض الخدمات بشكل موثوق وسريع.",
      icon: "COM",
    },
    {
      title: "مواقع شخصية",
      description: "مواقع شخصية مرنة لعرض خبراتك، إنجازاتك، وطرق التواصل بشكل أنيق.",
      icon: "PER",
    },
    {
      title: "مواقع ملف تعريفي",
      description: "صفحات Portfolio تعريفية مصممة لإبراز أعمالك وجذب العملاء المحتملين.",
      icon: "PRF",
    },
    {
      title: "تطبيقات الويب",
      description: "تطبيقات Web Apps مخصصة لإدارة العمليات الداخلية وتحسين الإنتاجية.",
      icon: "WEB",
    },
    {
      title: "منصات متكاملة",
      description: "منصات كبيرة متكاملة قابلة للتوسع تشمل الصلاحيات والتقارير والتكاملات.",
      icon: "PLT",
    },
    {
      title: "متاجر إلكترونية",
      description: "متاجر احترافية مع تجربة شراء سلسة، وإدارة منتجات وطلبات ودفع إلكتروني.",
      icon: "ECM",
    },
  ],
  en: [
    {
      title: "Company Websites",
      description: "Professional corporate websites that present brand identity and services clearly.",
      icon: "COM",
    },
    {
      title: "Personal Websites",
      description: "Flexible personal websites to showcase your profile, achievements, and contact channels.",
      icon: "PER",
    },
    {
      title: "Portfolio Websites",
      description: "Portfolio-focused websites that highlight your work and improve client conversion.",
      icon: "PRF",
    },
    {
      title: "Web Applications",
      description: "Custom web applications to automate workflows and improve business productivity.",
      icon: "WEB",
    },
    {
      title: "Integrated Platforms",
      description: "Scalable end-to-end platforms with permissions, dashboards, and integrations.",
      icon: "PLT",
    },
    {
      title: "E-commerce Stores",
      description: "Professional e-commerce stores with smooth checkout and full order management.",
      icon: "ECM",
    },
  ],
};

type ServiceIconKey = "COM" | "PER" | "PRF" | "WEB" | "PLT" | "ECM";

const serviceIcons: Record<ServiceIconKey, ComponentType<{ className?: string }>> = {
  COM: FiBriefcase,
  PER: FiUser,
  PRF: FiMonitor,
  WEB: FiCode,
  PLT: FiLayers,
  ECM: FiShoppingBag,
};

const techItems = [
  { name: "Next.js", icon: FiCpu, color: "text-slate-900 bg-slate-100" },
  { name: "Tailwind", icon: FiGlobe, color: "text-cyan-700 bg-cyan-50" },
  { name: "Node.js", icon: FiCode, color: "text-green-700 bg-green-50" },
  { name: "PHP", icon: FiMonitor, color: "text-indigo-700 bg-indigo-50" },
  { name: "PostgreSQL", icon: FiDatabase, color: "text-blue-700 bg-blue-50" },
];

export default async function PortfolioPage({ lang }: PortfolioPageProps) {
  const isArabic = lang === "ar";
  const t = localized[lang];
  const projects = await getPublishedProjectsByLang(lang);
  const services = servicesByLang[lang];
  const logoByLang = isArabic
    ? "/logo 250px/arabic5@0.1x.png"
    : "/logo 250px/english4@0.1x.png";
  const footerLogo = "/logo 250px/footer1@0.1x.png";
  const langHref = isArabic ? "/en" : "/";

  return (
    <main dir={isArabic ? "rtl" : "ltr"} className="min-h-screen bg-[#f9fafb] text-slate-800">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95">
        <div
          className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-4 sm:px-8"
          dir={isArabic ? "rtl" : "ltr"}
        >
          <a href="#home" className="flex items-center gap-3">
            <Image
              src={logoByLang}
              alt={t.logoAlt}
              width={214}
              height={56}
              priority
              className="h-12 w-auto object-contain sm:h-[3.25rem]"
            />
          </a>
          <nav className="hidden items-center gap-7 text-sm text-slate-700 md:flex" dir={isArabic ? "rtl" : "ltr"}>
            <a href="#home" className="transition hover:text-blue-600">{t.navHome}</a>
            <a href="#projects" className="transition hover:text-blue-600">{t.navProjects}</a>
            <a href="#services" className="transition hover:text-blue-600">{t.navServices}</a>
            <a href="#contact" className="transition hover:text-blue-600">{t.navContact}</a>
          </nav>
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={langHref}
              className="rounded-full border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-100 sm:px-4 sm:text-sm"
            >
              {t.langButton}
            </a>
            <a
              href="#contact"
              className="rounded-full border border-blue-200 bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
            >
              {t.requestQuote}
            </a>
          </div>
        </div>
        <div className="border-t border-slate-200 bg-white px-5 py-3 md:hidden" dir={isArabic ? "rtl" : "ltr"}>
          <nav className="flex flex-wrap items-center gap-4 text-sm text-slate-700">
            <a href="#home" className="transition hover:text-blue-600">{t.navHome}</a>
            <a href="#projects" className="transition hover:text-blue-600">{t.navProjects}</a>
            <a href="#services" className="transition hover:text-blue-600">{t.navServices}</a>
            <a href="#contact" className="transition hover:text-blue-600">{t.navContact}</a>
          </nav>
        </div>
      </header>

      <section
        id="home"
        className="section-offset mx-auto grid w-full max-w-6xl items-center gap-10 px-5 py-16 sm:px-8 lg:grid-cols-2 lg:py-24"
      >
        <div>
          <h1 className="text-4xl font-extrabold leading-tight text-slate-900 sm:text-5xl lg:text-6xl">
            <span className="text-blue-700">{t.heroBrand}</span>
            {t.heroTitleRest}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
            {t.heroDesc}
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href="#projects"
              className="rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              {t.heroPrimaryCta}
            </a>
            <a
              href="#contact"
              className="rounded-full border border-blue-300 px-6 py-3 text-sm font-semibold text-blue-700 transition hover:border-blue-500 hover:bg-blue-50"
            >
              {t.heroSecondaryCta}
            </a>
          </div>
        </div>

        <div className="rounded-3xl border border-blue-100 bg-white p-4 shadow-lg shadow-blue-100/60">
          <Image
            src="/mockups/mockup-hero.svg"
            alt={t.heroImageAlt}
            width={1200}
            height={800}
            priority
            className="h-[300px] w-full rounded-2xl object-cover sm:h-[360px]"
          />
        </div>
      </section>

      <section
        id="projects"
        className="section-offset perf-section mx-auto w-full max-w-6xl px-5 py-14 sm:px-8"
      >
        <h2 className="text-3xl font-bold text-slate-900">{t.projectsTitle}</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {projects.map((project) => (
            <article
              key={project.title}
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="relative">
                <Image
                  src={project.image}
                  alt={project.title}
                  width={1400}
                  height={900}
                  className="h-44 w-full object-cover"
                />
                <button
                  aria-label={t.prev}
                  className="absolute right-3 top-1/2 hidden -translate-y-1/2 rounded-full border border-white/70 bg-white/50 px-2 py-1 text-xs text-slate-700 backdrop-blur-sm group-hover:inline-flex"
                >
                  <FiArrowRight />
                </button>
                <button
                  aria-label={t.next}
                  className="absolute left-3 top-1/2 hidden -translate-y-1/2 rounded-full border border-white/70 bg-white/50 px-2 py-1 text-xs text-slate-700 backdrop-blur-sm group-hover:inline-flex"
                >
                  <FiArrowLeft />
                </button>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold text-slate-900">{project.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{project.description}</p>
                <p className="mt-2 text-xs text-slate-500">{project.stack}</p>
                {project.projectUrl ? (
                  <a
                    href={project.projectUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-blue-700 hover:text-blue-800"
                  >
                    {t.viewDetails}
                    <FiExternalLink className="h-3.5 w-3.5" aria-hidden />
                  </a>
                ) : (
                  <a href="#contact" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-blue-700 hover:text-blue-800">
                    {t.viewDetails}
                    <FiExternalLink className="h-3.5 w-3.5" aria-hidden />
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        id="services"
        className="section-offset perf-section mx-auto w-full max-w-6xl px-5 py-14 sm:px-8"
      >
        <h2 className="text-3xl font-bold text-slate-900">{t.servicesTitle}</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {services.map((service) => (
            <article
              key={service.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                {(() => {
                  const Icon = serviceIcons[service.icon as ServiceIconKey];
                  return <Icon className="h-5 w-5" aria-hidden />;
                })()}
              </span>
              <h3 className="mt-4 text-xl font-bold text-slate-900">{service.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{service.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section
        className="perf-section mx-auto w-full max-w-6xl px-5 py-14 sm:px-8"
      >
        <h2 className="text-3xl font-bold text-slate-900">{t.techTitle}</h2>
        <div className="mt-8 grid grid-cols-2 gap-4 text-slate-700 sm:grid-cols-3 lg:grid-cols-5">
          {techItems.map((tech) => (
            <div key={tech.name} className={`flex items-center gap-3 rounded-2xl border px-4 py-3 ${tech.color}`}>
              <tech.icon className="h-5 w-5" aria-hidden />
              <span className="text-sm font-medium">{tech.name}</span>
            </div>
          ))}
        </div>
      </section>

      <section
        id="contact"
        className="section-offset perf-section mx-auto w-full max-w-6xl px-5 py-14 sm:px-8"
      >
        <h2 className="text-3xl font-bold text-blue-700">{t.contactTitle}</h2>
        <div className="mt-7 grid gap-8 lg:grid-cols-3">
          <form
            action="/api/contact"
            method="post"
            className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2"
          >
            <input type="hidden" name="lang" value={lang} />
            <input
              name="name"
              type="text"
              placeholder={t.inputName}
              required
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500"
            />
            <input
              name="email"
              type="email"
              placeholder={t.inputEmail}
              required
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500"
            />
            <input
              name="phone"
              type="tel"
              placeholder={t.inputPhone}
              required
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500"
            />
            <input
              name="address"
              type="text"
              placeholder={t.inputAddress}
              required
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500"
            />
            <textarea
              name="message"
              rows={5}
              placeholder={t.inputMessage}
              required
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500"
            />
            <button
              type="submit"
              className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              {t.send}
            </button>
          </form>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900">{t.contactInfoTitle}</h3>
            <p className="mt-4 flex items-center gap-2 text-sm text-slate-700">
              <FiPhone className="h-4 w-4 text-blue-600" aria-hidden />
              01080455031
            </p>
            <p className="mt-3 flex items-center gap-2 text-sm text-slate-700">
              <FiMail className="h-4 w-4 text-blue-600" aria-hidden />
              mohamedelrbe3y@gmail.com
            </p>
            <p className="mt-3 flex items-center gap-2 text-sm text-slate-700">
              <FiMapPin className="h-4 w-4 text-blue-600" aria-hidden />
              Egypt
            </p>
          </div>
        </div>
      </section>

      <footer className="perf-section border-t border-blue-100 bg-blue-50/70 py-6">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 text-sm text-slate-700 sm:px-8" dir="ltr">
          <Image
            src={footerLogo}
            alt={t.logoAlt}
            width={152}
            height={40}
            className="h-10 w-auto object-contain"
          />
          <span>{t.copyright}</span>
        </div>
      </footer>

      <a
        href="https://wa.me/201080455031"
        target="_blank"
        rel="noreferrer"
        aria-label={t.whatsappAria}
        className="fixed bottom-6 left-6 z-30 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:scale-105"
      >
        <FiMessageCircle className="h-6 w-6" aria-hidden />
      </a>
    </main>
  );
}
