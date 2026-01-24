import { HTMLMotionProps } from 'framer-motion';

export const fadeUp = (delay = 0, visited = false): HTMLMotionProps<'div'> => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 }, // 뷰포트 진입 시 애니메이션
  transition: {
    delay: visited ? 0 : delay,
    duration: 1,
    ease: [0.2, 1, 0.4, 1],
  },
  viewport: {
    once: true, // true면 한 번만, false면 스크롤 반복 시 다시 애니메이션
    amount: 0.5, // 요소가 n% 보이면 시작 (0~1)
  },
});

export const fadeDown = (
  delay = 0,
  visited = false
): HTMLMotionProps<'div'> => ({
  initial: { opacity: 0, y: -20 },
  whileInView: { opacity: 1, y: 0 },
  transition: {
    delay: visited ? 0 : delay,
    duration: 1,
    ease: [0.2, 1, 0.4, 1],
  },
  viewport: {
    once: true,
    amount: 0.5,
  },
});
