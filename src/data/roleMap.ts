export type RoleType = "develop" | "design";

type RoleData = {
  titleEn: string;
  titleKo: string;
  replaceRole: (role: string) => string;
};

export const roleMap: Record<RoleType, RoleData> = {
  develop: {
    titleEn: "Frontend Developer",
    titleKo: "프론트엔드 개발자",
    replaceRole: (role: string) => role,
  },
  design: {
    titleEn: "UX/UI Designer",
    titleKo: "UX/UI 디자이너/퍼블리셔",
    replaceRole: (role: string) =>
      role
        .replace(/UI Developer/g, "Web Publisher")
        .replace(/\bUI Dev\b/g, "Markup"),
  },
};
