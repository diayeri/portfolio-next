"use client";

import { useRef, useState, type CSSProperties, type RefObject } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { WallPhoto } from "@/data/shelfItems";

/** 이 거리(px) 이상 움직이면 클릭이 아니라 드래그로 본다 */
const DRAG_CLICK_THRESHOLD = 5;
const SETTLE_SPRING = { type: "spring", stiffness: 260, damping: 18 } as const;

type PolaroidProps = {
  photo: WallPhoto;
  wallRef: RefObject<HTMLElement | null>;
  zIndex: number;
  onPick: (id: string) => void;
};

const randomTilt = () => Math.round((Math.random() * 8 - 4) * 10) / 10;

export default function Polaroid({ photo, wallRef, zIndex, onPick }: PolaroidProps) {
  const reduceMotion = useReducedMotion();
  const didDrag = useRef(false);
  const [rotate, setRotate] = useState(photo.rotate);
  const [isDragging, setIsDragging] = useState(false);

  const position = {
    "--x-m": `${photo.home.mobile.x}%`,
    "--y-m": `${photo.home.mobile.y}%`,
    "--x-d": `${photo.home.desktop.x}%`,
    "--y-d": `${photo.home.desktop.y}%`,
    zIndex,
  } as CSSProperties;

  return (
    <motion.div
      className="absolute left-[var(--x-m)] top-[var(--y-m)] w-[30vw] max-w-[150px] cursor-grab touch-none active:cursor-grabbing md:left-[var(--x-d)] md:top-[var(--y-d)] md:w-[clamp(140px,13vw,200px)] md:max-w-none"
      style={position}
      drag
      dragConstraints={wallRef}
      dragElastic={0.08}
      dragMomentum={false}
      initial={false}
      animate={{ rotate }}
      whileDrag={{ scale: 1.06, rotate: 0 }}
      whileHover={reduceMotion ? undefined : { scale: 1.02 }}
      transition={reduceMotion ? { duration: 0 } : SETTLE_SPRING}
      onPointerDown={() => {
        didDrag.current = false;
        onPick(photo.id);
      }}
      onDrag={(_, info) => {
        if (
          Math.hypot(info.offset.x, info.offset.y) > DRAG_CLICK_THRESHOLD
        ) {
          didDrag.current = true;
        }
      }}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => {
        setIsDragging(false);
        // 놓은 자리에 붙으면서 살짝 기울어진다
        setRotate(randomTilt());
      }}
    >
      <Link
        href={`/projects/${photo.id}`}
        aria-label={`${photo.title} 프로젝트 보기`}
        draggable={false}
        onClick={(event) => {
          if (didDrag.current) event.preventDefault();
        }}
        onFocus={() => onPick(photo.id)}
        className={`relative block select-none bg-surface-light p-2 pb-2.5 transition-shadow duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary md:p-3 md:pb-3.5 ${
          isDragging
            ? "shadow-[0_18px_34px_rgba(0,0,0,0.25)] shadow-gray-900/30"
            : "shadow-[0_6px_14px_rgba(0,0,0,0.18)] shadow-gray-900/20"
        }`}
      >
        {/* 벽에 붙인 테이프 */}
        <span
          aria-hidden="true"
          className="absolute -top-2.5 left-1/2 h-5 w-12 -translate-x-1/2 -rotate-3 bg-gray-100/70 shadow-sm md:-top-3 md:h-6 md:w-16"
        />
        <span className="relative block overflow-hidden aspect-square bg-surface-dark">
          <Image
            src={photo.image}
            alt={photo.title}
            fill
            sizes="(min-width: 768px) 200px, 30vw"
            className="object-cover"
            draggable={false}
          />
        </span>
        <span className="mt-1.5 block break-keep text-center font-hand text-[13px] leading-tight text-text md:mt-2 md:text-lg">
          {photo.keyword}
        </span>
      </Link>
    </motion.div>
  );
}
