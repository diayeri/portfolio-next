import type { Metadata } from "next";
import { Gaegu, Space_Mono } from "next/font/google";
import localFont from "next/font/local";
import DefaultLayout from "@/layouts/DefaultLayout";
import Script from "next/script";
import GAListener from "@/utils/analytics/GAListener";
import "./globals.css";

const satoshi = localFont({
  variable: "--font-sans-en",
  src: [
    { path: "../../public/fonts/SatoshiVariable.woff2", weight: "100 900" },
  ],
});

const spaceMono = Space_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

// 손글씨체(폴라로이드 키워드, 포인트 문구). Phase 1에서 폰트를 확정하면 이 블록만 바꾼다.
// 한글 글리프는 subset으로 나눌 수 없어 preload를 끈다.
const handFont = Gaegu({
  variable: "--font-hand",
  weight: ["400", "700"],
  preload: false,
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default:
      process.env.NEXT_PUBLIC_SITE_TITLE ??
      "Dayoung Jung | UX UI Designer & Developer",
    template: "Dayoung Jung | UX UI Designer & Developer",
  },
  description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION,
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://portfolio-dy.vercel.app",
  ),

  openGraph: {
    title: process.env.NEXT_PUBLIC_SITE_TITLE,
    description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION,
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: "Portfolio",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/favicon/apple-icon-180x180.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
      </head>
      <body className={`${satoshi.variable} ${spaceMono.variable} ${handFont.variable} antialiased`}>
        <GAListener />
        <DefaultLayout>{children}</DefaultLayout>
      </body>
    </html>
  );
}
