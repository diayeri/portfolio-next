import Link from "next/link";
import { Button } from "@/components/Button";
import { Home } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="px-20 text-center mt-60">
      <h1 className="mb-4 text-4xl font-bold">404</h1>
      <p className="mb-12 text-xl">Page not found</p>
      <Link href="/">
        <Button size="sm" iconLeft={<Home />}>
          Home
        </Button>
      </Link>
    </div>
  );
}
