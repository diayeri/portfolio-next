"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function GAListener() {
  const pathname = usePathname();

  useEffect(() => {
    if (
      !window.gtag ||
      !process.env.NEXT_PUBLIC_GA_ID ||
      process.env.NODE_ENV !== "production"
    )
      return;

    window.gtag("config", process.env.NEXT_PUBLIC_GA_ID, {
      page_path: pathname,
    });
  }, [pathname]);

  return null;
}
