import { MDXRemote } from "next-mdx-remote/rsc";
import ProjectLayout from "@/components/ProjectLayout";
import { getProject } from "@/lib/projects";
import { projectsData } from "@/data/projectsData";
import BeforeAfter from "@/components/project/BeforeAfter";

const components = {
  BeforeAfter,
};

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const project = await getProject(id);

  return (
    <ProjectLayout title={project.meta.title}>
      <MDXRemote source={project.content} components={components} />
    </ProjectLayout>
  );
}

// 정적 페이지로 미리 생성할 프로젝트 ID 목록
export async function generateStaticParams() {
  return projectsData.map((project) => ({
    id: project.id, // 각 페이지 params.id에 매핑
  }));
}
