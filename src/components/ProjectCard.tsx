"use client";

import React from "react";
import type { ProjectsData } from "../types/projects";
import NextImage from "next/image";
import Link from "next/link";

interface ProjectCardProps {
  project: ProjectsData;
}

/**
 * 프로젝트 카드 컴포넌트
 * - 프로젝트 정보 표시
 * - 반응형 디자인
 * - 호버 효과
 */
const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <Link
      href={`/projects/${project.id}`}
      className="group relative flex flex-col bg-white/40 backdrop-blur-md border border-gray-200/60 rounded-[32px] overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-gray-200/50 hover:bg-white/80"
    >
      {/* 1. 상단 비주얼 영역 (Thumbnail) */}
      <div className="relative w-full h-[260px] overflow-hidden bg-gray-50 border-b border-gray-200/60">
        <NextImage
          src={project.thumbnail}
          alt={project.title}
          fill
          className="object-cover transition-all duration-700 group-hover:scale-105 brightness-[0.98] group-hover:brightness-100"
        />
        {/* 카테고리 오버레이 배지 */}
        <div className="absolute flex flex-wrap gap-2 top-4 left-4">
          {Array.isArray(project.category)
            ? project.category.map((cat, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-xs font-bold tracking-widest text-white uppercase rounded-full bg-gray-900/40 backdrop-blur-md"
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
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-bold tracking-wider uppercase text-primary opacity-70">
            {project.client}
          </span>
          <span className="text-xs font-medium text-gray-400">
            {project.startDate} —{" "}
            {project.endDate?.split(".")[1] ? project.endDate : "Present"}
          </span>
        </div>

        {/* 제목 및 설명 */}
        <h3 className="mb-3 text-2xl font-bold tracking-tight text-gray-900 transition-colors group-hover:text-primary-dark">
          {project.title}
        </h3>
        <p className="mb-6 text-sm leading-relaxed text-gray-500 line-clamp-2">
          {project.description}
        </p>

        {/* 3. 하단 기술 스택 (공간 효율을 위해 주요 4개만 노출) */}
        <div className="mt-auto flex flex-wrap gap-1.5">
          {project.tech.slice(0, 4).map((tech, index) => (
            <span
              key={index}
              className="px-2.5 py-1 text-xs font-semibold text-gray-500 bg-gray-50 rounded-lg border border-gray-100 group-hover:bg-white transition-colors"
            >
              {tech}
            </span>
          ))}
          {project.tech.length > 4 && (
            <span className="self-center ml-1 text-xs font-medium text-gray-300">
              +{project.tech.length - 4}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
