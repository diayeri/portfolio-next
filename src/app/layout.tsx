import type { Metadata } from "next";
import { Space_Mono } from "next/font/google";
import localFont from "next/font/local";
import DefaultLayout from "@/layouts/DefaultLayout";
import MobileNotice from "@/components/MobileNotice";
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

export const metadata: Metadata = {
  title: {
    default:
      process.env.NEXT_PUBLIC_SITE_TITLE ?? "Dayoung Jung | UI Developer",
    template: "Dayoung Jung | UI Developer",
  },
  description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION,
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL!),

  openGraph: {
    title: process.env.NEXT_PUBLIC_SITE_TITLE,
    description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION,
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: "Portfolio",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-icon-180x180.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${satoshi.variable} ${spaceMono.variable} antialiased`}>
        <DefaultLayout>{children}</DefaultLayout>
        <MobileNotice></MobileNotice>
      </body>
    </html>
  );
}
