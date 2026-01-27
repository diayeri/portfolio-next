"use client";

import React, { useState } from "react";
import ProjectCard from "@/components/ProjectCard";
import AnimatedElement from "@/components/AnimatedElement";
// import { useRouter } from "next/navigation";
import { Button } from "@/components/Button";
import type { ProjectData } from "@/types/ProjectData";
// import { projectsData } from '@/data/projectsData';

const projectsData: ProjectData[] = [
  {
    id: 1,
    title: "Portfolio Website",
    description:
      "A personal portfolio website built with React, TypeScript and Tailwind CSS. Features modern design, dark mode, and responsive layout.",
    tech: ["React", "TypeScript", "Tailwind CSS", "Vite"],
    images: [
      "https://placehold.co/400x250/svg?text=Portfolio",
      "https://placehold.co/400x250/svg?text=Portfolio+2",
    ],
    link: "/projects/3",
    github: "https://github.com/username/portfolio",
  },
  {
    id: 2,
    title: "E-commerce Platform",
    description:
      "An online shopping platform with product listings, cart functionality, and checkout process. Includes user authentication, product filtering, and payment integration.",
    tech: ["React", "Redux", "Node.js", "MongoDB", "Express"],
    images: [
      "https://placehold.co/400x250/svg?text=E-commerce",
      "https://placehold.co/400x250/svg?text=E-commerce+2",
    ],
    link: "/projects/1",
    github: "https://github.com/username/ecommerce",
  },
  {
    id: 3,
    title: "Task Management App",
    description:
      "A productivity application for managing tasks, projects, and deadlines. Features include drag-and-drop task organization, priority levels, and progress tracking.",
    tech: ["React", "Firebase", "Material UI", "Redux"],
    image: "https://placehold.co/400x250/svg?text=Task+App", // legacy single image
    link: "/projects/2",
  },
  {
    id: 4,
    title: "Weather Dashboard",
    description:
      "Real-time weather information dashboard with location-based forecasts. Features interactive maps, hourly forecasts, and severe weather alerts.",
    tech: ["JavaScript", "Weather API", "Chart.js", "Leaflet"],
    image: "https://placehold.co/400x250/svg?text=Weather+App",
    link: "#",
    github: "https://github.com/username/weather-app",
  },
  {
    id: 5,
    title: "Social Media Dashboard",
    description:
      "Analytics dashboard for social media platforms that integrates multiple accounts and provides engagement metrics and content performance data.",
    tech: ["React", "D3.js", "Node.js", "OAuth"],
    image: "https://placehold.co/400x250/svg?text=Social+Media",
    link: "#",
    github: "https://github.com/username/social-dashboard",
  },
];

type Category = "all" | "frontend" | "markup" | "design";

const Projects: React.FC = () => {
  const [category, setCategory] = useState<Category>("all");

  // const router = useRouter();
  return (
    <section className="w-full px-10 py-20">
      <div className="py-10 text-center">
        <h2 className="mb-10 text-5xl font-bold">Projects</h2>
        <div className="flex justify-center gap-2">
          {(["all", "frontend", "markup", "design"] as Category[]).map((c) => (
            <Button
              key={c}
              onClick={() => setCategory(c)}
              className={category === c ? "active" : ""}
            >
              {c.toUpperCase()}
            </Button>
          ))}
        </div>
      </div>
      <div className="max-w-[1400px] mx-auto grid grid-cols-3 gap-5">
        {projectsData.map((project, index) => (
          <AnimatedElement
            key={project.id}
            animation="fade-up"
            duration={800}
            delay={300 + index * 100}
          >
            <div
              // onClick={() => router.push(`/projects/${project.id}`)}
              className="h-full cursor-pointer"
            >
              <ProjectCard
                project={project}
                className="h-full text-xs md:text-sm"
              />
            </div>
          </AnimatedElement>
        ))}
      </div>
    </section>
  );
};

export default Projects;
