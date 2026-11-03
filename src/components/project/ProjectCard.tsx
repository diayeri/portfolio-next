"use client";

import React from "react";
import type { ProjectsData } from "../../types/projects";
import NextImage from "next/image";
import Link from "next/link";

interface ProjectCardProps {
  project: ProjectsData;
  variant?: "light" | "dark";
}

/**
 * 프로젝트 카드 컴포넌트
 * - 프로젝트 정보 표시
 * - 반응형 디자인
 * - 호버 효과
 */
const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  variant = "light",
}) => {
  const isDark = variant === "dark";

  return (
    <Link
      href={`/projects/${project.id}`}
      className={`group relative flex h-full flex-col overflow-hidden rounded-[32px] border backdrop-blur-md transition-all duration-500 hover:-translate-y-2 ${
        isDark
          ? "border-white/10 bg-[#211b2e] text-white shadow-xl shadow-black/20 hover:border-white/20 hover:bg-[#2b233a] hover:shadow-2xl hover:shadow-black/40"
          : "border-gray-200/60 bg-white/40 hover:bg-white/80 hover:shadow-2xl hover:shadow-gray-200/50"
      }`}
    >
      {/* 1. 상단 비주얼 영역 (Thumbnail) */}
      <div
        className={`relative h-[260px] w-full overflow-hidden border-b ${
          isDark
            ? "border-white/10 bg-[#302541]"
            : "border-gray-200/60 bg-gray-50"
        }`}
      >
        <NextImage
          src={project.thumbnail}
          alt={project.title}
          fill
          className="object-cover object-top transition-all duration-700 group-hover:scale-105 brightness-[0.98] group-hover:brightness-100"
        />
        {/* 카테고리 오버레이 배지 */}
        <div className="absolute flex flex-wrap gap-2 top-4 left-4">
          {Array.isArray(project.category)
            ? project.category.map((cat, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-xs font-bold tracking-widest text-white uppercase rounded-full bg-gray-900/30 backdrop-blur-md"
                >
                  {cat}
                </span>
              ))
            : null}
        </div>
      </div>

      {/* 2. 정보 영역 */}
      <div className="flex flex-col flex-1 p-6">
        {/* 클라이언트 및 기간 정보 */}
        <div className="flex items-start justify-between mb-4">
          <span className="text-xs font-bold tracking-wider uppercase text-primary text-nowrap">
            {project.clientType === "personal"
              ? "Personal Project"
              : project.client}
          </span>
          <span
            className={`text-right text-xs font-normal ${
              isDark ? "text-gray-400" : "text-gray-500"
            }`}
          >
            {project.startDate} —{" "}
            {project.endDate?.split(".")[1] ? project.endDate : "Present"}
          </span>
        </div>

        {/* 제목 및 설명 */}
        <h3
          className={`mb-3 text-2xl font-bold tracking-tight transition-colors ${
            isDark
              ? "text-white group-hover:text-primary-light"
              : "text-gray-900 group-hover:text-primary-dark"
          }`}
        >
          {project.title}
        </h3>
        <p
          className={`mb-6 line-clamp-2 text-sm leading-relaxed ${
            isDark ? "text-gray-300" : "text-gray-500"
          }`}
        >
          {project.description}
        </p>

        {/* 3. 하단 기술 스택 (공간 효율을 위해 주요 4개만 노출) */}
        <div className="mt-auto flex flex-wrap gap-1.5">
          {project.tech.slice(0, 4).map((tech, index) => (
            <span
              key={index}
              className={`rounded-lg border px-2.5 py-1 text-xs font-semibold transition-colors ${
                isDark
                  ? "border-white/10 bg-white/5 text-gray-300 group-hover:bg-white/10"
                  : "border-gray-200 bg-gray-50 text-gray-500 group-hover:bg-white"
              }`}
            >
              {tech}
            </span>
          ))}
          {project.tech.length > 4 && (
            <span
              className={`ml-1 self-center text-xs font-medium ${
                isDark ? "text-gray-500" : "text-gray-300"
              }`}
            >
              +{project.tech.length - 4}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
