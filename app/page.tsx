import type { Metadata } from "next";
import PortfolioPage from "@/components/PortfolioPage";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "الرئيسية",
  description:
    "نَفِّذ تقدم مواقع وأنظمة مخصصة للشركات والسناتر التعليمية بسرعة عالية وتجربة محسنة لمحركات البحث.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "نَفِّذ | حلول برمجية مخصصة",
    description:
      "نَفِّذ تقدم مواقع وأنظمة مخصصة للشركات والسناتر التعليمية بسرعة عالية وتجربة محسنة لمحركات البحث.",
    url: siteUrl,
    images: ["/logo 250px/arabic5@0.1x.png"],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/logo 250px/arabic5@0.1x.png"],
  },
  icons: {
    icon: ["/logo 250px/arabic5@0.1x.png"],
    shortcut: ["/logo 250px/arabic5@0.1x.png"],
    apple: ["/logo 250px/arabic5@0.1x.png"],
  },
};

export default function Home() {
  return <PortfolioPage lang="ar" />;
}
