import { MDXRemote } from "next-mdx-remote/rsc";
import { getProject } from "@/lib/projects";
import { projectsData } from "@/data/projectsData";
import { notFound } from "next/navigation";
import ProjectLayout from "@/components/project/ProjectLayout";
import BeforeAfter from "@/components/project/mdx/BeforeAfter";

const components = {
  BeforeAfter,
};

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  // const projectId = id?.toLowerCase() ?? ""; // URL 파라미터에서 현재 프로젝트 ID를 찾음
  const projectMDX = await getProject(id); // MDX 내용
  const projectInfo = projectsData.find((p) => p.id === id); // 메타 정보

  if (!projectInfo) {
    notFound();
  }

  return (
    <ProjectLayout project={projectInfo}>
      <MDXRemote source={projectMDX.content} components={components} />
    </ProjectLayout>
  );
}

// 정적 페이지로 미리 생성할 프로젝트 ID 목록
export async function generateStaticParams() {
  return projectsData.map((project) => ({
    id: project.id,
  }));
}
