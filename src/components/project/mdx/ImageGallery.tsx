"use client";

import React, { useState, useEffect } from "react";
import NextImage from "next/image";

interface ImageItem {
  src: string;
  alt: string;
  label?: string;
}

interface ImageGalleryProps {
  images: ImageItem[];
  height?: string; // 예: '300px'
}

const ImageGallery = ({ images, height = "400px" }: ImageGalleryProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // 모달 오픈 시 스크롤 방지
  useEffect(() => {
    if (isModalOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [isModalOpen]);

  const openModal = (index: number) => {
    setCurrentIndex(index);
    setIsModalOpen(true);
  };

  return (
    <div className="w-full my-8">
      {/* 1. 메인 가로 스크롤 영역 */}
      <div
        className="flex gap-4 pb-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
        style={{ height }}
      >
        {images?.map((img, idx) => (
          <div
            key={idx}
            className="relative flex-none cursor-pointer snap-start group"
            onClick={() => openModal(idx)}
          >
            <NextImage
              src={img.src}
              alt={img.alt}
              className="h-full w-auto object-cover rounded-lg shadow-md transition-transform duration-300 group-hover:scale-[1.02]"
            />
            {img.label && (
              <p className="mt-2 text-sm text-center text-gray-500">
                {img.label}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* 2. 전체화면 모달 (Portal 구현 권장하나 단순화를 위해 인라인 배치) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black/90 p-4 transition-opacity">
          {/* 닫기 버튼 */}
          <button
            onClick={() => setIsModalOpen(false)}
            className="absolute text-3xl text-white transition-colors top-6 right-6 hover:text-gray-300"
          >
            ✕
          </button>

          {/* 메인 확대 이미지 */}
          <div className="flex flex-col items-center w-full max-w-5xl">
            <NextImage
              src={images[currentIndex].src}
              alt={images[currentIndex].alt}
              className="max-h-[70vh] w-auto object-contain shadow-2xl"
            />
            {images[currentIndex].label && (
              <p className="mt-6 text-lg font-medium text-white">
                {images[currentIndex].label}
              </p>
            )}
          </div>

          {/* 하단 썸네일 리스트 */}
          <div className="absolute flex max-w-full gap-2 px-4 overflow-x-auto bottom-10">
            {images.map((img, idx) => (
              <a
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`relative flex-none w-20 h-14 rounded-md overflow-hidden border-2 transition-all ${
                  currentIndex === idx
                    ? "border-blue-500 scale-110"
                    : "border-transparent opacity-50"
                }`}
              >
                <NextImage
                  src={img.src}
                  alt="thumbnail"
                  className="object-cover w-full h-full"
                />
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;

// 사용예
{
  /* <ImageGallery
  height="350px"
  images={[
    {
      src: "/projects/chromatic/mockup.png",
      alt: "Trade Page",
      label: "데스크탑 트레이딩 대시보드",
    },
    {
      src: "/projects/chromatic/mockup.png",
      alt: "Mobile UI",
      label: "모달 기반 트레이딩 폼 (Mobile)",
    },
    {
      src: "/projects/chromatic/mockup.png",
      alt: "Dark Mode Chart",
      label: "실시간 데이터 시각화 라이브러리 적용",
    },
  ]}
/>; */
}
