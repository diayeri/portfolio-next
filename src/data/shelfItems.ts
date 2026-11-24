import { projectsData } from "@/data/projectsData";
import type { ProjectsData } from "@/types/projects";

/** 섹션 기준 퍼센트 좌표(왼쪽 위 모서리). */
type Slot = { x: number; y: number };

type WallPhotoConfig = {
  /** 폴라로이드 하단 손글씨 키워드 (Phase 0에서 문구 확정) */
  keyword: string;
  /**
   * featured.order 상위 2개는 선반 위 액자(frame)가 된다.
   * Phase 3에서는 액자도 임시로 폴라로이드로 표시한다.
   */
  kind: "frame" | "polaroid";
  /** 정돈 상태 위치 */
  home: { desktop: Slot; mobile: Slot };
  /** 정돈 상태 기울기(deg) */
  rotate: number;
};

const wallPhotoConfig: Record<string, WallPhotoConfig> = {
  rounz: {
    keyword: "AI 가상 피팅 / Admin 개편",
    kind: "frame",
    home: { desktop: { x: 6, y: 17 }, mobile: { x: 3, y: 55 } },
    rotate: -4,
  },
  muna: {
    keyword: "공연 리뷰 커뮤니티",
    kind: "frame",
    home: { desktop: { x: 22, y: 14 }, mobile: { x: 34, y: 54 } },
    rotate: 3,
  },
  chromatic: {
    keyword: "블록체인 트레이드 UI",
    kind: "polaroid",
    home: { desktop: { x: 38, y: 19 }, mobile: { x: 65, y: 56 } },
    rotate: -2,
  },
  klaybay: {
    keyword: "마켓플레이스 / 반응형",
    kind: "polaroid",
    home: { desktop: { x: 13, y: 55 }, mobile: { x: 17, y: 76 } },
    rotate: 2,
  },
  "miral-payment": {
    keyword: "결제 리뉴얼 / UX 개선",
    kind: "polaroid",
    home: { desktop: { x: 30, y: 52 }, mobile: { x: 51, y: 77 } },
    rotate: -3,
  },
};

/** config가 없는 featured 프로젝트가 생겨도 깨지지 않도록 쓰는 기본값 */
const fallbackConfig = (project: ProjectsData, index: number): WallPhotoConfig => ({
  keyword: project.title,
  kind: "polaroid",
  home: {
    desktop: { x: 8 + (index % 3) * 16, y: 20 + Math.floor(index / 3) * 36 },
    mobile: { x: 4 + (index % 3) * 31, y: 55 + Math.floor(index / 3) * 21 },
  },
  rotate: index % 2 === 0 ? -2 : 2,
});

export type WallPhoto = WallPhotoConfig & {
  id: string;
  title: string;
  image: string;
};

/** 메인 대표 프로젝트: projectsData의 featured 필드만 기준으로 삼는다 (featured.order 오름차순). */
export const getWallPhotos = (): WallPhoto[] =>
  projectsData
    .filter((project) => project.featured !== undefined)
    .sort((a, b) => a.featured!.order - b.featured!.order)
    .map((project, index) => ({
      ...(wallPhotoConfig[project.id] ?? fallbackConfig(project, index)),
      id: project.id,
      title: project.title,
      image: project.featured!.cover,
    }));
