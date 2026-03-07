"use client";

import { useRouter, useParams } from "next/navigation";
import { projectsData } from "@/data/projectsData";
import { notFound } from "next/navigation";
import { ProjectHeader } from "./ProjectHeader";
import { ProjectNav } from "./ProjectNav";

export default function ProjectLayout({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const projectId = id?.toLowerCase() ?? ""; // URL 파라미터에서 현재 프로젝트 ID를 찾음
  const project = projectsData.find((p) => p.id === projectId);

  if (!project) {
    notFound();
  }

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
      <ProjectHeader project={project} />
      {/* 프로젝트 콘텐츠 */}
      <main className="prose prose-slate lg:prose-xl max-w-none">
        {children}
      </main>
      {/* 이전/다음 프로젝트 내비게이션 */}
      <ProjectNav project={project} />
    </div>
  );
}
