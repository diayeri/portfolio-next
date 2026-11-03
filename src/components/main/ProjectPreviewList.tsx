"use client";

import ProjectCard from "@/components/project/ProjectCard";
import { projectsData } from "@/data/projectsData";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useRef } from "react";

type ProjectPreviewListProps = {
  projectIds: string[];
};

const ProjectPreviewList = ({ projectIds }: ProjectPreviewListProps) => {
  const viewportRef = useRef<HTMLDivElement>(null);
  const projects = projectIds.flatMap((id) => {
    const project = projectsData.find((item) => item.id === id);
    return project && project.showInList !== false ? [project] : [];
  });

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = viewport?.firstElementChild;
    const firstCard = viewport?.querySelector<HTMLElement>(
      "[data-project-card]",
    );
    if (!viewport || !track || !firstCard || projects.length === 0) return;

    const getGroupWidth = () => {
      const gap = Number.parseFloat(getComputedStyle(track).gap);
      return (firstCard.offsetWidth + gap) * projects.length;
    };
    viewport.scrollLeft = getGroupWidth();

    const handleScroll = () => {
      const groupWidth = getGroupWidth();
      if (viewport.scrollLeft < groupWidth - 1) {
        viewport.scrollLeft += groupWidth;
      } else if (viewport.scrollLeft >= groupWidth * 2 - 1) {
        viewport.scrollLeft -= groupWidth;
      }
    };

    viewport.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      viewport.removeEventListener("scroll", handleScroll);
    };
  }, [projects.length]);

  if (projects.length === 0) return null;

  const scrollByCard = (direction: -1 | 1) => {
    const viewport = viewportRef.current;
    const card = viewport?.querySelector<HTMLElement>("[data-project-card]");
    const track = viewport?.firstElementChild;
    if (!viewport || !card || !track) return;

    const gap = Number.parseFloat(getComputedStyle(track).gap);
    viewport.scrollBy({
      left: direction * (card.offsetWidth + gap),
      behavior: "smooth",
    });
  };

  return (
    <section
      aria-labelledby="project-preview-title"
      className="w-full py-16 overflow-hidden bg-[#171321] text-white md:py-24"
      id="main"
    >
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="flex items-end justify-between gap-6 mb-8 md:mb-12">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-secondary-light md:text-sm">
              Selected Works
            </p>
            <h2
              className="text-3xl font-bold tracking-tight text-white md:text-5xl"
              id="project-preview-title"
            >
              Project Preview
            </h2>
          </div>
          <div className="hidden gap-3 sm:flex">
            <button
              aria-label="Previous projects"
              className="grid w-12 h-12 text-gray-300 transition-colors border rounded-full place-items-center border-white/20 hover:border-secondary-light hover:text-secondary-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-secondary-light"
              onClick={() => scrollByCard(-1)}
              type="button"
            >
              <ArrowLeft aria-hidden="true" size={20} />
            </button>
            <button
              aria-label="Next projects"
              className="grid w-12 h-12 text-gray-300 transition-colors border rounded-full place-items-center border-white/20 hover:border-secondary-light hover:text-secondary-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-secondary-light"
              onClick={() => scrollByCard(1)}
              type="button"
            >
              <ArrowRight aria-hidden="true" size={20} />
            </button>
          </div>
        </div>

        <div
          aria-label="Selected project previews"
          className="snap-x snap-mandatory overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:overflow-x-hidden md:snap-none"
          ref={viewportRef}
          role="region"
          tabIndex={0}
        >
          <div className="flex items-stretch gap-4 md:gap-5">
            {[0, 1, 2].flatMap((copyIndex) =>
              projects.map((project) => (
                <div
                  aria-hidden={copyIndex !== 1}
                  className="w-[90%] flex-none snap-start md:w-[calc((100%-1.25rem)/2)] xl:w-[calc((100%-2.5rem)/3)]"
                  data-project-card
                  inert={copyIndex !== 1}
                  key={`${copyIndex}-${project.id}`}
                >
                  <ProjectCard project={project} variant="dark" />
                </div>
              )),
            )}
          </div>
        </div>

        <Link
          className="flex items-center justify-center w-full gap-4 px-6 py-4 mt-8 text-base font-bold text-white transition-all border shadow-sm group min-h-12 rounded-3xl border-white/15 bg-white/5 hover:-translate-y-1 hover:border-secondary-light/60 hover:bg-white/10 hover:shadow-xl hover:shadow-black/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-secondary-light md:mt-10 md:px-10 md:text-lg"
          href="/projects"
        >
          <span>View All Projects</span>
        </Link>
      </div>
    </section>
  );
};

export default ProjectPreviewList;
