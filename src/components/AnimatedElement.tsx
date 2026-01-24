"use client";

import React, { useEffect, useRef, useState } from "react";

interface AnimatedElementProps {
  children: React.ReactNode;
  animation:
    | "fade-up"
    | "fade-down"
    | "fade-left"
    | "fade-right"
    | "zoom-in"
    | "zoom-out";
  duration?: number;
  delay?: number;
  threshold?: number;
  className?: string;
  once?: boolean;
}

/**
 * 등장 애니메이션을 적용하는 래퍼 컴포넌트
 * - Intersection Observer API를 사용하여 요소가 뷰포트에 진입할 때 애니메이션 적용
 * - 다양한 애니메이션 효과 지원
 */
const AnimatedElement: React.FC<AnimatedElementProps> = ({
  children,
  animation,
  duration = 800,
  delay = 0,
  threshold = 0.2,
  className = "",
  once = true,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  // 애니메이션 클래스 지정 함수
  const getAnimationClass = () => {
    if (!isVisible) {
      return "opacity-0";
    }

    return "opacity-100";
  };

  // 애니메이션 스타일 지정 함수
  const getAnimationStyle = () => {
    const baseStyle = {
      transition: `transform ${duration}ms ease-out ${delay}ms, opacity ${duration}ms ease-out ${delay}ms`,
    };

    if (!isVisible) {
      switch (animation) {
        case "fade-up":
          return { ...baseStyle, transform: "translateY(40px)" };
        case "fade-down":
          return { ...baseStyle, transform: "translateY(-40px)" };
        case "fade-left":
          return { ...baseStyle, transform: "translateX(40px)" };
        case "fade-right":
          return { ...baseStyle, transform: "translateX(-40px)" };
        case "zoom-in":
          return { ...baseStyle, transform: "scale(0.9)" };
        case "zoom-out":
          return { ...baseStyle, transform: "scale(1.1)" };
        default:
          return baseStyle;
      }
    }

    return { ...baseStyle, transform: "translateY(0) translateX(0) scale(1)" };
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // once가 true이면 한 번 보이면 관찰 중단
          if (once && elementRef.current) {
            observer.unobserve(elementRef.current);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin: "0px 0px -100px 0px" },
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [threshold, once]);

  return (
    <div
      ref={elementRef}
      className={`${getAnimationClass()} ${className}`}
      style={getAnimationStyle()}
    >
      {children}
    </div>
  );
};

export default AnimatedElement;
