"use client";

import { useSearchParams } from "next/navigation";

const ROLE_SET = {
  develop: {
    titleEn: "UI Developer",
    titleKo: "UI 개발자",
    tag: "UI Dev",
    replaceRole: (role: string) => role,
  },
  design: {
    titleEn: "UI Designer",
    titleKo: "UI 디자이너/퍼블리셔",
    tag: "Markup",
    replaceRole: (role: string) =>
      role.replace(/UI Developer/g, "Web Publisher"),
  },
};
type RoleType = keyof typeof ROLE_SET;
export default function useRoleMode() {
  const searchParams = useSearchParams();
  const role: RoleType =
    searchParams.get("role") === "design" ? "design" : "develop";

  return { role, ...ROLE_SET[role] };
}
