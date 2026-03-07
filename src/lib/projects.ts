import "server-only";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Project } from "@/types/projects";

const projectsPath = path.join(process.cwd(), "src/content/projects");

export async function getProject(id: string): Promise<Project> {
  const filePath = path.join(projectsPath, `${id}.mdx`);
  const file = fs.readFileSync(filePath, "utf-8");

  const { data, content } = matter(file);

  return {
    meta: data as Project["meta"],
    content,
  };
}
