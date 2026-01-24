import { useRouter } from "next/router";
import { Button } from "@/components/Button";
import { ArrowLeft } from "lucide-react";

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <div className="px-20 text-center mt-60">
      <h1 className="mb-4 text-4xl font-bold">404</h1>
      <p className="mb-12 text-xl">Page not found</p>
      <Button size="sm" iconLeft={<ArrowLeft />} onClick={() => router.back()}>
        Back
      </Button>
    </div>
  );
}
