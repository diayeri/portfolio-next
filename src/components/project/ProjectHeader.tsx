"use client";

import React from "react";
import { ProjectsData } from "@/types/projects";
import { motion } from "framer-motion";
import { fadeUp } from "@/motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const ProjectHeader = ({ project }: { project: ProjectsData }) => {
  return (
    <section className="max-w-[1200px] mx-auto pt-20 pb-24 md:pb-32">
      {/* Back Button Area */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-gray-400 transition-colors group hover:text-primary-dark"
        >
          <div className="flex items-center justify-center w-8 h-8 transition-all border border-gray-100 rounded-full group-hover:border-primary-dark">
            <ArrowLeft size={16} />
          </div>
          <span className="text-[11px] font-bold tracking-[0.2em] uppercase">
            Project List
          </span>
        </Link>
      </motion.div>

      <div className="flex flex-col items-center justify-between gap-12 lg:flex-row lg:gap-20">
        {/* Left: Main Content */}
        <div className="flex-1 space-y-8">
          <motion.div {...fadeUp(0)} className="space-y-4">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter text-gray-900 leading-[0.95]">
              {project.title}
            </h1>
          </motion.div>

          <motion.p
            {...fadeUp(0.1)}
            className="max-w-2xl text-base leading-relaxed text-gray-500 md:text-lg break-keep"
          >
            {project.description}
          </motion.p>

          {/* Tech Stack */}
          <motion.div {...fadeUp(0.2)} className="flex flex-wrap gap-1.5">
            {project.tech.map((tech, index) => (
              <span
                key={index}
                className="px-3 py-1 text-xs font-semibold text-gray-500 border border-gray-200 rounded-sm bg-gray-50/50"
              >
                {tech}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Right: Project Meta */}
        <motion.div
          {...fadeUp(0.3)}
          className="w-full lg:w-[300px] shrink-0 pt-8 lg:pt-2 lg:border-l lg:pl-12 border-gray-100"
        >
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-y-8 gap-x-4">
            <MetaItem label="Role" value={project.category} />
            <MetaItem
              label={project.clientType || "Client"}
              value={project.client}
            />
            <MetaItem
              label="Period"
              value={`${project.startDate} — ${project.endDate ?? "Present"}`}
            />

            {/* Connect Section */}
            {(project.links || project.github) && (
              <div className="col-span-2 space-y-2 lg:col-span-1">
                <span className="text-[11px] font-bold tracking-widest uppercase text-primary-light">
                  Connect
                </span>
                <div className="flex flex-col gap-1">
                  {project.links?.map((link, idx) => (
                    <a
                      key={idx}
                      href={link}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1 text-sm font-semibold text-gray-700 transition-colors hover:text-primary group"
                    >
                      Visit Website{" "}
                      <span className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">
                        ↗
                      </span>
                    </a>
                  ))}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1 text-sm font-semibold text-gray-700 transition-colors hover:text-primary"
                    >
                      Github Repository
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const MetaItem = ({
  label,
  value,
}: {
  label: string;
  value: string | string[];
}) => (
  <div className="space-y-1.5">
    <span className="text-[11px] font-bold tracking-widest uppercase text-primary-light">
      {label}
    </span>
    <div className="text-sm font-semibold leading-tight text-gray-700 break-keep">
      {Array.isArray(value) ? value.join(", ") : value}
    </div>
  </div>
);
