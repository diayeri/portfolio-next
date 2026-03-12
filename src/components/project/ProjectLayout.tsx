import { ProjectsData } from "@/types/projects";
import { notFound } from "next/navigation";
import { ProjectHeader } from "./ProjectHeader";
import { ProjectNav } from "./ProjectNav";

export default function ProjectLayout({
  project,
  children,
}: {
  project: ProjectsData;
  children: React.ReactNode;
}) {
  // const router = useRouter();

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
