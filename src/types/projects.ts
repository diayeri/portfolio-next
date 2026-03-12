export interface ProjectsData {
  id: string;
  title: string;
  startDate: string;
  endDate?: string | null; // 없으면 진행중
  category: string[];
  tech: string[];
  client: string;
  clientType: "company" | "client" | "institution" | "personal";

  featured?: {
    order: number;
    cover: string;
  };

  links?: string[];
  github?: string;

  thumbnail: string;
  description?: string;
}

export type ProjectMeta = {
  title: string;
  description: string;
  date?: string;
};

export type Project = {
  meta: ProjectMeta;
  content: string;
};
