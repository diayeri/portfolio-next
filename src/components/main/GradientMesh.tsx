"use client";

import { Color, Mesh, Program, Renderer, Triangle } from "ogl";
import { useEffect, useRef } from "react";

const vertexShader = `
attribute vec2 uv;
attribute vec2 position;

varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const createFragmentShader = (distortion: number) => {
  const iterations = Math.max(1, Math.min(8, Math.round(distortion)));

  return `
precision highp float;

uniform float uTime;
uniform float uSwirl;
uniform float uSpeed;
uniform float uScale;
uniform float uOffsetX;
uniform float uOffsetY;
uniform float uRotation;
uniform float uWaveAmp;
uniform float uWaveFreq;
uniform float uWaveSpeed;
uniform float uGrain;
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform vec3 uColorC;
uniform vec3 uResolution;

varying vec2 vUv;

float wave(vec2 uv, float freq, float speed, float time) {
  return sin(uv.x * freq + time * speed) * cos(uv.y * freq + time * speed);
}

float random(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

vec3 colorDodge(vec3 base, vec3 blend) {
  return min(base / (1.0 - blend + 0.0001), 1.0);
}

void main() {
  float minResolution = min(uResolution.x, uResolution.y);
  vec2 uv = (vUv * 2.0 - 1.0) * uResolution.xy / minResolution;
  uv = uv * uScale + vec2(uOffsetX, uOffsetY);

  float cosRotation = cos(uRotation);
  float sinRotation = sin(uRotation);
  uv = vec2(
    uv.x * cosRotation - uv.y * sinRotation,
    uv.x * sinRotation + uv.y * cosRotation
  );

  uv.x += wave(uv, uWaveFreq, uWaveSpeed, uTime) * uWaveAmp;
  uv.y += wave(uv + 10.0, uWaveFreq * 1.5, uWaveSpeed * 0.8, uTime) * uWaveAmp * 0.5;

  float angle = atan(uv.y, uv.x);
  float radius = length(uv);
  angle += uSwirl * radius;
  uv = vec2(cos(angle), sin(angle)) * radius;

  float d = -uTime * 0.5 * uSpeed;
  float a = 0.0;
  for (int i = 0; i < ${iterations}; ++i) {
    float step = float(i);
    a += cos(step - d - a * uv.x);
    d += sin(uv.y * step + a);
  }
  d += uTime * 0.5 * uSpeed;

  float mixA = (sin(d) + 1.0) * 0.5;
  float mixB = (cos(a) + 1.0) * 0.5;
  vec3 color = mix(uColorA, uColorB, mixA);
  color = mix(color, uColorC, mixB);

  float grain = (random(gl_FragCoord.xy + uTime) - 0.5) * uGrain;
  color = colorDodge(color, vec3(0.5 + grain));

  gl_FragColor = vec4(color, 1.0);
}
`;
};

const meshColorTokens = [
  "--color-hero-mesh-a",
  "--color-hero-mesh-b",
  "--color-hero-mesh-c",
] as const;

const fallbackColors = ["#3b2a8d", "#aaa7d7", "#f75092"] as const;

function hexToRgb(hex: string, fallback: string): [number, number, number] {
  const value = hex.trim().replace(/^#/, "");
  const normalized = value.length === 3 ? value.replace(/(.)/g, "$1$1") : value;
  const validHex = /^[0-9a-f]{6}$/i.test(normalized) ? normalized : fallback.slice(1);

  return [0, 2, 4].map((offset) => parseInt(validHex.slice(offset, offset + 2), 16) / 255) as [
    number,
    number,
    number,
  ];
}

type GradientMeshProps = {
  className?: string;
  opacity?: number;
  speed?: number;
};

export function GradientMesh({
  className = "",
  opacity = 0.3,
  speed = 0.3,
}: GradientMeshProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let renderer: Renderer;
    try {
      renderer = new Renderer({
        alpha: true,
        antialias: false,
        dpr: Math.min(window.devicePixelRatio || 1, 1.5),
      });
    } catch {
      return;
    }

    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);

    const computedStyles = window.getComputedStyle(container);
    const colors = meshColorTokens.map((token, index) => {
      const color = computedStyles.getPropertyValue(token).trim() || fallbackColors[index];
      return new Color(...hexToRgb(color, fallbackColors[index]));
    });

    const uniforms = {
      uTime: { value: 0 },
      uSwirl: { value: 0.5 },
      uSpeed: { value: speed },
      uScale: { value: 1 },
      uOffsetX: { value: 0 },
      uOffsetY: { value: 0 },
      uRotation: { value: Math.PI / 2 },
      uWaveAmp: { value: 0.1 },
      uWaveFreq: { value: 10 },
      uWaveSpeed: { value: 0.2 * speed },
      uGrain: { value: 0.06 },
      uColorA: { value: colors[0] },
      uColorB: { value: colors[1] },
      uColorC: { value: colors[2] },
      uResolution: { value: new Color(1, 1, 1) },
    };

    const geometry = new Triangle(gl);
    const program = new Program(gl, {
      vertex: vertexShader,
      fragment: createFragmentShader(5),
      uniforms,
      transparent: true,
      depthTest: false,
      depthWrite: false,
    });
    const mesh = new Mesh(gl, { geometry, program });
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    gl.canvas.style.display = "block";
    gl.canvas.style.width = "100%";
    gl.canvas.style.height = "100%";
    container.appendChild(gl.canvas);

    let isVisible = typeof IntersectionObserver === "undefined";
    let animationFrame: number | null = null;

    const renderFrame = (time: number) => {
      animationFrame = null;
      uniforms.uTime.value = time * 0.001;
      renderer.render({ scene: mesh });

      if (isVisible && !reducedMotion.matches) {
        animationFrame = window.requestAnimationFrame(renderFrame);
      }
    };

    const startAnimation = () => {
      if (isVisible && !reducedMotion.matches && animationFrame === null) {
        animationFrame = window.requestAnimationFrame(renderFrame);
      }
    };

    const stopAnimation = () => {
      if (animationFrame !== null) {
        window.cancelAnimationFrame(animationFrame);
        animationFrame = null;
      }
    };

    const resize = () => {
      const { width, height } = container.getBoundingClientRect();
      if (!width || !height) return;

      renderer.setSize(width, height);
      uniforms.uResolution.value = new Color(
        gl.canvas.width,
        gl.canvas.height,
        gl.canvas.width / gl.canvas.height,
      );
      renderer.render({ scene: mesh });
    };

    const visibilityObserver =
      typeof IntersectionObserver === "undefined"
        ? null
        : new IntersectionObserver(([entry]) => {
            isVisible = Boolean(entry?.isIntersecting);
            if (isVisible) startAnimation();
            else stopAnimation();
          }, { threshold: 0.01 });

    const handleMotionPreferenceChange = () => {
      if (reducedMotion.matches) {
        stopAnimation();
        uniforms.uTime.value = 0;
        renderer.render({ scene: mesh });
      } else {
        startAnimation();
      }
    };

    visibilityObserver?.observe(container);
    window.addEventListener("resize", resize);
    reducedMotion.addEventListener("change", handleMotionPreferenceChange);
    resize();
    startAnimation();

    return () => {
      stopAnimation();
      visibilityObserver?.disconnect();
      window.removeEventListener("resize", resize);
      reducedMotion.removeEventListener("change", handleMotionPreferenceChange);
      if (gl.canvas.parentElement === container) container.removeChild(gl.canvas);
      program.remove();
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [speed]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{ opacity: Math.max(0, Math.min(1, opacity)) }}
    />
  );
}
