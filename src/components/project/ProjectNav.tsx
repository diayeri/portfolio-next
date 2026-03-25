import React from "react";
import { ProjectsData } from "@/types/projects";
import { projectsData } from "@/data/projectsData";
import Link from "next/link";
import { ChevronRight, ChevronLeft } from "lucide-react";

export const ProjectNav = ({ project }: { project: ProjectsData }) => {
  // 1. 모든 프로젝트를 가져와서 메인 리스트와 동일하게 최신순으로 정렬
  const allSortedProjects = [...projectsData].sort((a, b) =>
    b.startDate.localeCompare(a.startDate),
  );

  // 2. 현재 프로젝트의 인덱스를 찾기
  const currentIndex = allSortedProjects.findIndex((p) => p.id === project.id);

  // 3. 이전/다음 프로젝트를 결정
  const prevProject =
    currentIndex > 0 ? allSortedProjects[currentIndex - 1] : null;
  const nextProject =
    currentIndex < allSortedProjects.length - 1
      ? allSortedProjects[currentIndex + 1]
      : null;

  return (
    <div className="flex flex-col items-stretch justify-between gap-8 pt-8 mt-12 border-t border-gray-200 md:flex-row md:items-center md:mt-20 md:gap-0">
      {/* Previous Project */}
      <div className="flex-1">
        {prevProject && (
          <Link
            href={`/projects/${prevProject.id}`}
            className="inline-flex items-center transition-transform group hover:-translate-x-1"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700 md:w-6 md:h-6" />
            <div className="ml-3">
              <div className="text-[10px] md:text-sm font-bold tracking-widest text-gray-400 uppercase">
                Previous
              </div>
              <div className="text-base font-medium text-gray-700 transition-colors md:text-lg group-hover:text-primary">
                {prevProject.title}
              </div>
            </div>
          </Link>
        )}
      </div>

      {/* Next Project */}
      <div className="flex-1 text-right">
        {nextProject && (
          <Link
            href={`/projects/${nextProject.id}`}
            className="inline-flex items-center text-right transition-transform group hover:translate-x-1"
          >
            <div className="mr-3">
              <div className="text-[10px] md:text-sm font-bold tracking-widest text-gray-400 uppercase">
                Next
              </div>
              <div className="text-base font-medium text-gray-700 transition-colors md:text-lg group-hover:text-primary">
                {nextProject.title}
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-700 md:w-6 md:h-6" />
          </Link>
        )}
      </div>
    </div>
  );
};
