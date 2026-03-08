export interface ProjectsData {
  id: string;
  title: string;
  startDate: string;
  endDate?: string | null; // 없으면 진행중
  category: string;
  tech: string[];
  client: string;

  featured?: {
    order: number;
    cover: string;
  };

  links?: string[];
  github?: string;

  description?: string;
  images?: string[];
}

export const projectsData: ProjectsData[] = [
  {
    id: "rounz",
    title: "Rounz E-Commerce, Admin",
    startDate: "2024.12",
    endDate: "2025.05",
    category: "Frontend",
    tech: ["React", "TypeScript", "Recoil", "SCSS", "MUI", "jQuery"],
    client: "이스트소프트",
    featured: {
      order: 1,
      cover: "/projects/rounz/mockup.png",
    },
    links: ["https://rounz.com/series.php?contentIndex=155"],
    description: `AI 가상 피팅으로 안경을 써보고 구매할 수 있는 이커머스 플랫폼의 사용자 화면과, 복잡한 상품 데이터를 편리하게 관리하는 운영 시스템을 개발한 프로젝트`,
  },
  {
    id: "muna",
    title: "Muna",
    startDate: "2024.09",
    endDate: "2024.10",
    category: "Frontend",
    tech: ["React", "TypeScript", "Redux Toolkit", "Firebase", "SCSS", "Figma"],
    client: "이스트소프트 프론트엔드 부트캠프 1기",
    featured: {
      order: 2,
      cover: "/projects/muna/mockup.png",
    },
  },
  {
    id: "chromatic",
    title: "Chromatic Protocol",
    startDate: "2023.03",
    endDate: "2024.04",
    category: "UI Dev",
    tech: ["React", "TypeScript", "Tailwind", "Storybook"],
    client: "Quarkonix",
    featured: {
      order: 3,
      cover: "/projects/chromatic/mockup.png",
    },
    links: [
      "https://app.chromatic.finance/",
      "https://www.chromatic.finance/",
      // 'https://chromatic.gitbook.io/docs',
    ],
    github: "https://github.com/chromatic-protocol/frontend-archive",
    description: `복잡한 차트와 금융 데이터를 한눈에 확인하며, 유동성 공급과 보상 체계를 직관적인 UI로 구현한 탈중앙화 금융(DeFi) 플랫폼`,
  },
  {
    id: "klaybay",
    title: "Klaybay, Admin",
    startDate: "2022.03",
    endDate: "2023.02",
    category: "UI Dev",
    tech: ["React", "MUI", "SCSS", "Storybook"],
    client: "Krust Universe",
    featured: {
      order: 4,
      cover: "/projects/klaybay/mockup.png",
    },
  },
  {
    id: "stichy",
    title: "Stichy",
    startDate: "2020.10",
    endDate: "2021.04",
    category: "UI Dev",
    tech: ["SCSS", "Bootstrap"],
    client: "Cocone",
    featured: {
      order: 5,
      cover: "/projects/stichy/mockup.png",
    },
  },
  {
    id: "miral-payment",
    title: "Miral Payment Renewal",
    startDate: "2019.03",
    endDate: "2020.01",
    category: "Design",
    tech: ["Photoshop"],
    client: "밀알복지재단",
    featured: {
      order: 6,
      cover: "/projects/miral-payment/mockup.png",
    },
  },
];
