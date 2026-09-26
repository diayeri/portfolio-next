import "server-only";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type NoteMeta = {
  id: string;
  title: string;
  description: string;
  date: string;
  category?: string;
};

export type Note = {
  meta: NoteMeta;
  content: string;
};

const notesPath = path.join(process.cwd(), "src/content/notes");

export async function getNotes(): Promise<NoteMeta[]> {
  return fs
    .readdirSync(notesPath)
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map((fileName) => {
      const id = fileName.replace(/\.mdx$/, "");
      const file = fs.readFileSync(path.join(notesPath, fileName), "utf-8");
      const { data } = matter(file);

      return {
        id,
        title: data.title,
        description: data.description,
        date: data.date,
        category: data.category,
      };
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}

export async function getNote(id: string): Promise<Note> {
  const filePath = path.join(notesPath, `${id}.mdx`);
  const file = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(file);

  return {
    meta: { id, ...data } as NoteMeta,
    content,
  };
}
