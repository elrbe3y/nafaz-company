import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { siteUrl } from "@/lib/site";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Nafaz",
  url: siteUrl,
  logo: `${siteUrl}/logo 250px/footer1@0.1x.png`,
  email: "mohamedelrbe3y@gmail.com",
  telephone: "+201080455031",
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Nafaz",
  url: siteUrl,
  inLanguage: ["ar", "en"],
};

const geistSans = localFont({
  src: "./fonts/Cairo/Cairo-VariableFont_slnt,wght.ttf",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/Cairo/Cairo-VariableFont_slnt,wght.ttf",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "Nafaz",
  referrer: "origin-when-cross-origin",
  title: {
    default: "نَفِّذ | حلول برمجية مخصصة",
    template: "%s | نَفِّذ",
  },
  description:
    "نَفِّذ تقدم مواقع وأنظمة مخصصة للشركات والسناتر التعليمية بتجربة سريعة ومحسنة لمحركات البحث.",
  keywords: [
    "نَفِّذ",
    "مواقع شركات",
    "تطوير مواقع",
    "Next.js",
    "برمجة مخصصة",
    "سنتر تعليمي",
    "Portfolio",
    "Web Development",
  ],
  authors: [{ name: "Nafaz" }],
  creator: "Nafaz",
  publisher: "Nafaz",
  verification: {
    google: "VSFhq4mZkkeOIi_2NasB8gxsNtTi_tIaz1LbxIiNEvI",
  },
  alternates: {
    canonical: "/",
    languages: {
      ar: "/",
      en: "/en",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    siteName: "نَفِّذ",
    title: "نَفِّذ | حلول برمجية مخصصة",
    description:
      "نَفِّذ تقدم مواقع وأنظمة مخصصة للشركات والسناتر التعليمية بتجربة سريعة ومحسنة لمحركات البحث.",
    url: siteUrl,
    images: [
      {
        url: "/mockups/mockup-hero.svg",
        width: 1200,
        height: 800,
        alt: "Nafaz portfolio preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "نَفِّذ | حلول برمجية مخصصة",
    description:
      "نَفِّذ تقدم مواقع وأنظمة مخصصة للشركات والسناتر التعليمية بتجربة سريعة ومحسنة لمحركات البحث.",
    images: ["/mockups/mockup-hero.svg"],
  },
  icons: {
    icon: [
      { url: "/logo 250px/footer1@0.1x.png", type: "image/png" },
      { url: "/logo 250px/arabic5@0.1x.png", type: "image/png" },
    ],
    shortcut: ["/logo 250px/footer1@0.1x.png"],
    apple: ["/logo 250px/footer1@0.1x.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const themeInitScript = `
    (function () {
      try {
        var stored = localStorage.getItem('theme');
        var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (stored === 'dark' || (!stored && prefersDark)) {
          document.documentElement.classList.add('dark');
        }
      } catch (e) {}
    })();
  `;

  return (
    <html lang="ar" dir="rtl">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        {children}
      </body>
    </html>
  );
}
