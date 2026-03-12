"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import NextImage from "next/image";
import { useRole } from "@/context/RoleContext";
import { Button } from "./Button";
import { ArrowRight } from "lucide-react";
import { projectsData } from "@/data/projectsData";
import { motion } from "framer-motion";
import { fadeUp } from "@/motion";

const FeaturedProjectList = () => {
  const { roleData } = useRole();
  const featuredProjects = useMemo(() => {
    return projectsData
      .filter((p) => p.featured !== undefined)
      .sort((a, b) => a.featured!.order! - b.featured!.order!);
  }, []);

  const [activeProject, setActiveProject] = useState(featuredProjects[0]);
  const router = useRouter();

  useEffect(() => {
    featuredProjects.forEach((project) => {
      const img = new Image();
      img.src = project.featured!.cover;
    });
  }, [featuredProjects]);

  return (
    <section className="w-full px-0 py-20 bg-black">
      <div className="flex items-center my-10">
        {/* 미리보기 영역 */}
        <div className="w-1/2 h-[600px] pl-12 rounded overflow-hidden flex items-center justify-center">
          <NextImage
            src={activeProject.featured!.cover}
            alt={activeProject.title}
            className="object-contain object-center w-full h-full transition-all duration-300"
            width={800}
            height={800}
          />
        </div>
        {/* 대표 프로젝트 리스트 */}
        <ul className="flex flex-col w-1/2 gap-0 pl-12 pr-20">
          <div className="flex justify-between w-full mb-12">
            <motion.h2
              {...fadeUp(0, false)}
              className="mr-auto text-5xl font-bold text-white"
            >
              Featured Projects
            </motion.h2>

            <Button
              size="sm"
              variant="outline"
              className=" hover:text-white hover:border-white"
              iconRight={<ArrowRight />}
              onClick={() => router.push("/projects")}
            >
              View All
            </Button>
          </div>
          {featuredProjects.map((project) => {
            const isActive = activeProject.id === project.id;
            return (
              <li
                className="group"
                key={project.id}
                onMouseEnter={() => setActiveProject(project)}
              >
                <a href={`/projects/${project.id}`}>
                  <div
                    className={`flex items-center justify-between py-8 duration-200 border-b ${isActive ? "border-white/60" : "border-white/20"}`}
                  >
                    <h3
                      className={`text-3xl font-semibold transition-colors duration-200 ${
                        isActive ? "text-white" : "text-gray-400/40"
                      }`}
                    >
                      {project.title}
                    </h3>
                    <div className="inline-flex gap-2 ml-5">
                      {project.category.map((tag) => (
                        <span
                          key={tag}
                          className={`
                            px-2 py-0.5 text-xs font-bold uppercase duration-200 tracking-wider rounded border transition-colors
                            ${
                              isActive
                                ? "bg-white/10 border-white/20 text-white"
                                : "bg-transparent border-white/20 text-white/30"
                            }
                          `}
                        >
                          {roleData.replaceRole(tag)}
                        </span>
                      ))}
                    </div>
                  </div>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default FeaturedProjectList;
