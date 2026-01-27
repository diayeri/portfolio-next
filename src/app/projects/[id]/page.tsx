"use client";

import React from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { projectsData } from "@/data/projectsData";
import { notFound } from "next/navigation";
import { ChevronRight, ChevronLeft } from "lucide-react";
import ProjectsDetailSection from "@/components/ProjectDetailSection";
import { projectSections } from "@/data/projectSections";

interface ProjectInfoItemProps {
  label: string;
  value: string | React.ReactNode;
  className?: string;
}

const ProjectInfoItem: React.FC<ProjectInfoItemProps> = ({
  label,
  value,
  className,
}) => (
  <div className={`py-2.5 ${className}`}>
    <h2 className="text-sm font-medium text-gray-400">{label}</h2>
    <p className="text-base text-gray-700">{value}</p>
  </div>
);

/**
 * 프로젝트 상세 정보를 표시하는 컴포넌트
 * - 프로젝트의 상세 정보 표시
 * - 기술 스택, 이미지, 설명 등을 표시
 * - 이전/다음 프로젝트로 이동 기능
 */
const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const projectId = id?.toLowerCase() ?? ""; // URL 파라미터에서 현재 프로젝트 ID를 찾음
  const project = projectsData.find((p) => p.id === projectId);

  if (!project) {
    notFound();
  }

  // 이전/다음 프로젝트 ID 계산
  const featuredProjects = projectsData
    .filter((p) => p.featured)
    .sort((a, b) => a.featured!.order - b.featured!.order);
  const currentIndex = featuredProjects.findIndex((p) => p.id === project.id);
  const prevProject =
    currentIndex > 0 ? featuredProjects[currentIndex - 1] : null;
  const nextProject =
    currentIndex < featuredProjects.length - 1
      ? featuredProjects[currentIndex + 1]
      : null;

  // 프로젝트 목록(Projects) 페이지로 이동
  // const goToProjects = (e: React.MouseEvent) => {
  //   e.preventDefault();
  //   navigate('/projects'); // cra
  //   router.push('/projects');
  // };

  return (
    <div className="max-w-6xl px-4 py-10 mx-auto">
      {/* <a
          href='/projects'
          className='inline-flex items-center mb-6 text-primary-light dark:text-primary-dark hover:underline'
          onClick={goToProjects}
        >
          Back to Projects
        </a> */}
      {/* 프로젝트 헤더 */}
      <div className="flex py-20">
        {/* left */}
        <div>
          <h1 className="mb-6 text-3xl font-bold md:text-4xl lg:text-6xl">
            {project.title}
          </h1>
          <p className="mb-6 text-base text-gray-700 whitespace-pre-line">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech, index) => (
              <span
                key={index}
                className="px-3 py-1 text-sm bg-gray-200 rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* right */}
        <div className="pl-20 ml-auto">
          <div className="flex gap-10">
            <ProjectInfoItem label="Role" value={project.category} />
            <ProjectInfoItem label="Client" value={project.client} />
            <ProjectInfoItem
              label="Period"
              value={`${project.startDate} ~ ${project.endDate ?? "Present"}`}
            />
          </div>
          {project.links && (
            <ProjectInfoItem
              className="col-span-full"
              label="Link"
              value={project.links.map((link, idx) => (
                <React.Fragment key={idx}>
                  <a
                    key={idx}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mr-3 text-sm underline"
                  >
                    {link}
                  </a>
                </React.Fragment>
              ))}
            />
          )}
          {project.github && (
            <ProjectInfoItem
              className="col-span-full"
              label="GitHub"
              value={
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm underline"
                >
                  {project.github.replace("https://github.com/", "")}
                </a>
              }
            />
          )}
        </div>
      </div>
      {/* 프로젝트 콘텐츠 */}
      {/* 상세 정보 */}
      <ProjectsDetailSection sections={projectSections[projectId] || []} />

      {/* 이전/다음 프로젝트 내비게이션 */}
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
    </div>
  );
};

export default ProjectDetail;
