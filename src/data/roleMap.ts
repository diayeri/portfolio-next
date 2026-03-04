export type RoleType = "develop" | "design";

type RoleData = {
  titleEn: string;
  titleKo: string;
  replaceRole: (role: string) => string;
};

export const roleMap: Record<RoleType, RoleData> = {
  develop: {
    titleEn: "UI Developer",
    titleKo: "UI 개발자",
    replaceRole: (role: string) => role,
  },
  design: {
    titleEn: "UI Designer",
    titleKo: "UI 디자이너/퍼블리셔",
    replaceRole: (role: string) =>
      role
        .replace(/UI Developer/g, "Web Publisher")
        .replace(/\bUI Dev\b/g, "Markup"),
  },
};
