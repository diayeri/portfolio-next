"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { sendEvent } from "@/utils/analytics/gtag";

const BuildDate = () => {
  const buildDateString =
    process.env.NEXT_PUBLIC_BUILD_DATE || new Date().toISOString();
  const formattedDate = buildDateString.split("T")[0].replace(/-/g, ".");

  return <span>Last updated: {formattedDate}</span>;
};

// Header 컴포넌트 props 타입 정의
interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = () => {
  return (
    <header className="fixed top-0 z-50 flex items-center justify-between w-full px-6 py-4 border-b backdrop-blur-lg border-gray-200/70">
      <div className="flex items-center">
        <Link
          href="/"
          className="font-mono text-base font-bold text-gray-700 hover:text-primary-light"
        >
          DtoD
        </Link>
      </div>
      <div className="">
        <Link
          href="https://github.com/diayeri/portfolio-next"
          target="_blank"
          className="flex items-center gap-1 text-sm text-gray-500/80 hover:text-primary-light"
          onClick={() =>
            sendEvent({
              action: "click",
              category: "portfolio",
              label: "buildDate_button",
            })
          }
        >
          {/* <span>🚧 Portfolio in Progress</span> */}
          {BuildDate()}
          <ArrowRight className="w-4" />
        </Link>
      </div>

      {/* <p className='text-sm text-white/70'>UI Developer, Dayoung Jung</p> */}
    </header>
  );
};

export default Header;
