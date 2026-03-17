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
    <div className="flex items-center justify-between pt-8 mt-20 border-t border-gray-200">
      <div>
        {prevProject && (
          <Link
            href={`/projects/${prevProject.id}`}
            className="inline-flex items-center group"
          >
            <ChevronLeft className="text-gray-700" />
            <div className="ml-2">
              <div className="text-sm text-gray-400">Previous Project</div>
              <div className="text-lg font-medium text-gray-700">
                {prevProject.title}
              </div>
            </div>
          </Link>
        )}
      </div>

      <div className="text-right">
        {nextProject && (
          <Link
            href={`/projects/${nextProject.id}`}
            className="inline-flex items-center group"
          >
            <div className="mr-2">
              <div className="text-sm text-gray-400">Next Project</div>
              <div className="text-lg font-medium text-gray-700">
                {nextProject.title}
              </div>
            </div>
            <ChevronRight className="text-gray-700" />
          </Link>
        )}
      </div>
    </div>
  );
};
