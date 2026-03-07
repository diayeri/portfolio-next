export type ProjectMeta = {
  title: string;
  description: string;
  date?: string;
};

export type Project = {
  meta: ProjectMeta;
  content: string;
};
