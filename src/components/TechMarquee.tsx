"use client";

import styles from "./TechMarquee.module.css";
import NextImage from "next/image";

export function TechMarquee() {
  const logos = [
    { src: "/logos/html.svg", alt: "HTML" },
    { src: "/logos/css.svg", alt: "CSS" },
    { src: "/logos/js.svg", alt: "JavaScript" },
    { src: "/logos/ts.svg", alt: "TypeScript" },
    { src: "/logos/react.svg", alt: "React" },
    { src: "/logos/jquery.svg", alt: "jQuery" },
    { src: "/logos/tailwind.svg", alt: "Tailwind" },
    { src: "/logos/mui.svg", alt: "MUI" },
    { src: "/logos/bootstrap.svg", alt: "Bootstrap" },
    { src: "/logos/figma.svg", alt: "Figma" },
    { src: "/logos/photoshop.svg", alt: "Photoshop" },
    { src: "/logos/illustrator.svg", alt: "Illustrator" },
    { src: "/logos/storybook.svg", alt: "Storybook" },
    { src: "/logos/framer.svg", alt: "Framer" },
    { src: "/logos/git.svg", alt: "Git" },
  ];

  const repeatedLogos = [...logos, ...logos];

  return (
    <div className="relative w-[800px] overflow-hidden">
      <div className={`flex w-max ${styles["animate-marquee"]}`}>
        {repeatedLogos.map((logo, i) => (
          <div
            key={i}
            className={`relative flex items-center justify-center mx-6 ${styles.group}`}
          >
            <NextImage
              src={logo.src}
              alt={logo.alt}
              width={40}
              height={40}
              className="w-auto h-10 transition duration-200 opacity-50 grayscale hover:opacity-100 hover:grayscale-0"
            />
            {/* hover 시 alt 텍스트 */}
            <span
              className={`absolute bottom-0 px-1 py-[2px] mb-2 text-sm font-medium backdrop-blur-md text-white bg-black/10 rounded pointer-events-none ${styles.alt}`}
            >
              {logo.alt}
            </span>
          </div>
        ))}
      </div>

      <div className="absolute top-0 left-0 z-10 w-20 h-full pointer-events-none bg-gradient-to-r from-white to-transparent" />
      <div className="absolute top-0 right-0 z-10 w-20 h-full pointer-events-none bg-gradient-to-l from-white to-transparent" />
    </div>
  );
}
