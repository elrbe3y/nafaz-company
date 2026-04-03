import type { Metadata } from "next";
import PortfolioPage from "@/components/PortfolioPage";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Nafaz creates fast custom websites and systems for businesses and educational centers with strong SEO foundations.",
  alternates: {
    canonical: "/en",
  },
  openGraph: {
    title: "Nafaz | Custom Software Solutions",
    description:
      "Nafaz creates fast custom websites and systems for businesses and educational centers with strong SEO foundations.",
    url: `${siteUrl}/en`,
    images: ["/logo 250px/english4@0.1x.png"],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/logo 250px/english4@0.1x.png"],
  },
  icons: {
    icon: ["/logo 250px/english4@0.1x.png"],
    shortcut: ["/logo 250px/english4@0.1x.png"],
    apple: ["/logo 250px/english4@0.1x.png"],
  },
};

export default function EnglishHome() {
  return <PortfolioPage lang="en" />;
}
