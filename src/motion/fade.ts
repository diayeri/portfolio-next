import { HTMLMotionProps, BezierDefinition } from "framer-motion";

// 기본 설정을 상수로 분리하여 관리하면 편리합니다.
const DEFAULT_EASE: BezierDefinition = [0.2, 1, 0.4, 1];

export const fadeUp = (delay = 0, visited = false): HTMLMotionProps<"div"> => ({
  initial: { opacity: 0, y: 15 },
  whileInView: { opacity: 1, y: 0 },
  transition: {
    delay: visited ? 0 : delay,
    duration: 0.5,
    ease: DEFAULT_EASE,
  },
  viewport: {
    once: true,
    amount: 0.1, // 10%만 보여도 즉시 시작 (답답함 해소)
    margin: "0px 0px -50px 0px", // 화면 하단에 닿기 50px 전부터 미리 시작
  },
});

// fadeDown도 동일한 철학으로 수정
export const fadeDown = (
  delay = 0,
  visited = false,
): HTMLMotionProps<"div"> => ({
  initial: { opacity: 0, y: -15 },
  whileInView: { opacity: 1, y: 0 },
  transition: {
    delay: visited ? 0 : delay,
    duration: 0.5,
    ease: DEFAULT_EASE,
  },
  viewport: {
    once: true,
    amount: 0.1,
  },
});
