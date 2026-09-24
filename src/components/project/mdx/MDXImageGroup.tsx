import type { ReactNode } from "react";

type MDXImageGroupProps = {
  children: ReactNode;
  className?: string;
};

export default function MDXImageGroup({
  children,
  className = "",
}: MDXImageGroupProps) {
  return (
    <div
      className={`flex flex-col items-start justify-center gap-2 my-4 md:my-10 sm:flex-row [&>figure]:w-full [&>figure]:min-w-0 [&>figure]:sm:w-1/2 ${className}`}
    >
      {children}
    </div>
  );
}
