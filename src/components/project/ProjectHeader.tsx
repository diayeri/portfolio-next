import React from "react";
import { ProjectsData } from "@/data/projectsData";

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
export const ProjectHeader = ({ project }: { project: ProjectsData }) => {
  return (
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
  );
};
