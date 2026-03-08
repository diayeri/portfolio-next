"use client";
import NextImage from "next/image";

interface MDXImageProps {
  src: string;
  alt: string;
  label?: string;
  width?: number;
  height?: number;
  maxHeight?: number; // 세로 길이를 제한하는 옵션 추가
  noBorder?: boolean;
  labelTop?: "before" | "after";
}

export default function MDXImage({
  src,
  alt,
  label,
  width = 1120,
  height = 450,
  maxHeight,
  noBorder = false,
  labelTop = undefined,
}: MDXImageProps) {
  return (
    <figure className="flex flex-col items-center justify-center my-10 not-prose">
      {labelTop && (
        <figcaption className="mb-2.5 text-sm font-bold tracking-widest text-center text-gray-400 uppercase">
          {labelTop}
        </figcaption>
      )}

      <div
        className={`relative overflow-hidden hover:scale-[1.02] duration-500 flex justify-center items-start ${!noBorder ? "border border-gray-200" : ""}`}
        style={maxHeight ? { maxHeight: `${maxHeight}px` } : {}}
      >
        <NextImage
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="object-cover w-auto h-auto mb-0 transition-transform"
          placeholder="blur"
          blurDataURL="rgb(229 231 235)"
        />
      </div>

      {label && (
        <figcaption className="mt-4 text-xs font-medium tracking-widest text-center text-gray-400 uppercase">
          {label}
        </figcaption>
      )}
    </figure>
  );
}
