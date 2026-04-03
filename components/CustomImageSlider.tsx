"use client";

import { AnimatePresence, motion } from "framer-motion";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { useMemo, useState } from "react";

type ProjectSlide = {
  id: number;
  title: string;
  price: string;
  tech: string;
  image: string;
};

const slides: ProjectSlide[] = [
  {
    id: 1,
    title: "منصة عقارات فاخرة",
    price: "ابتداءً من 95,000 جنيه",
    tech: "Next.js + Node.js + PostgreSQL",
    image:
      "https://images.unsplash.com/photo-1560184897-ae75f418493e?auto=format&fit=crop&w=1800&q=80",
  },
  {
    id: 2,
    title: "نظام إدارة سنتر تعليمي",
    price: "ابتداءً من 65,000 جنيه",
    tech: "Next.js + PHP API + Redis",
    image:
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1800&q=80",
  },
  {
    id: 3,
    title: "LMS للمنصات التعليمية",
    price: "ابتداءً من 120,000 جنيه",
    tech: "Node.js + S3 DRM + Microservices",
    image:
      "https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=1800&q=80",
  },
];

export default function CustomImageSlider() {
  const [index, setIndex] = useState(0);

  const activeSlide = useMemo(() => slides[index], [index]);

  const goNext = () => {
    setIndex((prev) => (prev + 1) % slides.length);
  };

  const goPrev = () => {
    setIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="group relative w-full overflow-hidden rounded-3xl border border-white/15 bg-black/40 shadow-2xl shadow-cyan-950/40">
      <div className="relative h-[350px] w-full sm:h-[440px] lg:h-[520px]">
        <AnimatePresence mode="wait">
          <motion.img
            key={activeSlide.id}
            src={activeSlide.image}
            alt={activeSlide.title}
            className="absolute inset-0 h-full w-full object-cover"
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/15" />

        <button
          onClick={goPrev}
          aria-label="المشروع السابق"
          className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/20 bg-white/10 p-3 text-white opacity-80 backdrop-blur-sm transition duration-300 hover:scale-105 hover:bg-white/20 hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 sm:opacity-0 sm:group-hover:opacity-100"
        >
          <FiArrowRight size={22} />
        </button>

        <button
          onClick={goNext}
          aria-label="المشروع التالي"
          className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/20 bg-white/10 p-3 text-white opacity-80 backdrop-blur-sm transition duration-300 hover:scale-105 hover:bg-white/20 hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 sm:opacity-0 sm:group-hover:opacity-100"
        >
          <FiArrowLeft size={22} />
        </button>

        <motion.div
          key={`info-${activeSlide.id}`}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="absolute bottom-5 right-5 z-10 w-[calc(100%-2.5rem)] rounded-2xl border border-white/30 bg-white/10 p-5 text-right text-white backdrop-blur-xl sm:bottom-6 sm:right-6 sm:max-w-xl"
        >
          <p className="font-[var(--font-geist-mono)] text-xl font-semibold sm:text-2xl">
            {activeSlide.title}
          </p>
          <p className="mt-2 text-sm text-cyan-100 sm:text-base">{activeSlide.price}</p>
          <p className="mt-1 text-xs text-zinc-200 sm:text-sm">{activeSlide.tech}</p>
        </motion.div>
      </div>
    </section>
  );
}
