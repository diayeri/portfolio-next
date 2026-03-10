"use client";

import styles from "./TechMarquee.module.css";

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
  ];

  const total = logos.length;
  // 각 로고 사이의 각도 계산
  const angle = 360 / total;
  // 궤도의 반지름 (멀리/가깝게 조절하려면 이 값을 수정하세요)
  const radius = 720;

  return (
    <div className={styles.container}>
      <div className={styles.stage}>
        <div className={styles.orbit}>
          {logos.map((logo, i) => (
            <div
              key={i}
              className={styles.item}
              style={{
                // 인라인 스타일로 각 로고의 위치값 계산
                transform: `rotateY(${i * angle}deg) translateZ(${radius}px)`,
              }}
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className="w-auto h-full transition duration-200 opacity-70 grayscale hover:opacity-100 hover:grayscale-0"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
