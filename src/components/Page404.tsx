"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/Button";
import { Home, ArrowLeft } from "lucide-react";

export default function Page404() {
  const router = useRouter();

  return (
    <div className="px-20 text-center mt-60">
      <h1 className="mb-4 text-4xl font-bold">404</h1>
      <p className="mb-12 text-xl">Page not found</p>
      <div className="flex justify-center gap-2">
        <Button
          size="sm"
          iconLeft={<ArrowLeft />}
          onClick={() => router.back()}
        >
          Back
        </Button>
        <Button size="sm" iconLeft={<Home />} onClick={() => router.push("/")}>
          Home
        </Button>
      </div>
    </div>
  );
}
