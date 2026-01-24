"use client";

import React, { useEffect, useRef } from "react";

interface AnimatedBackgroundProps {
  className?: string;
}

/**
 * 애니메이션 배경 컴포넌트
 * - Canvas 기반 애니메이션 배경
 * - 다크모드와 라이트모드에 맞는 색상 설정
 */
const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({
  className = "",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDarkMode = document.documentElement.classList.contains("dark");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    // 캔버스 크기를 윈도우에 맞게 설정
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasSize();

    // 윈도우 크기 변경 감지
    window.addEventListener("resize", setCanvasSize);

    // 파티클 클래스
    class Particle {
      x: number = 0;
      y: number = 0;
      size: number = 1;
      speedX: number = 0;
      speedY: number = 0;
      color: string = "rgba(255, 255, 255, 0.1)";

      constructor() {
        if (!canvas) return;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 5 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.color = isDarkMode
          ? `rgba(255, 255, 255, ${Math.random() * 0.2})`
          : `rgba(0, 0, 0, ${Math.random() * 0.2})`;
      }

      // 파티클 업데이트
      update() {
        if (!canvas) return;
        this.x += this.speedX;
        this.y += this.speedY;

        // 화면 경계에 닿으면 방향 전환
        if (this.x > canvas.width || this.x < 0) {
          this.speedX = -this.speedX;
        }
        if (this.y > canvas.height || this.y < 0) {
          this.speedY = -this.speedY;
        }
      }

      // 파티클 그리기
      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }
    }

    // 파티클 배열 초기화
    const particleCount = Math.min(
      100,
      Math.floor((canvas.width * canvas.height) / 15000),
    );
    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // 파티클 간 연결선 그리기
    const connectParticles = () => {
      if (!ctx) return;

      const maxDistance = 150;
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            const opacity = 1 - distance / maxDistance;
            ctx.strokeStyle = isDarkMode
              ? `rgba(255, 255, 255, ${opacity * 0.15})`
              : `rgba(0, 0, 0, ${opacity * 0.15})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    };

    // 애니메이션 루프
    const animate = () => {
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const particle of particles) {
        particle.update();
        particle.draw();
      }

      connectParticles();

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", setCanvasSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDarkMode]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute top-0 left-0 w-full h-full -z-10 ${className}`}
    />
  );
};

export default AnimatedBackground;
