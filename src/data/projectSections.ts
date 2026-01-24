// 1. 단순 문단
export type TextSection = {
  type: 'text';
  content: string;
};

// 2. 리스트 섹션
export type ListSection = {
  type: 'list';
  heading?: string; // optional 가능
  items: string[];
};

// 3. 단일 이미지 섹션
export type ImageSection = {
  type: 'image';
  src: string;
  layout: 'full' | 'small';
  caption?: string;
};

// 4. 이미지 + 텍스트 조합
export type ImageTextSection = {
  type: 'image-text';
  layout: 'side' | 'top';
  image: string;
  content: string;
};

// 5. 갤러리 섹션
export type GallerySection = {
  type: 'gallery';
  layout: 'grid' | 'carousel';
  images: string[];
};

export type ProjectSection =
  | TextSection
  | ListSection
  | ImageSection
  | ImageTextSection
  | GallerySection;

export const projectSections: Record<string, ProjectSection[]> = {
  chromatic: [
    { type: 'text', content: '소개글...' },
    { type: 'image', src: '/img.png', layout: 'full' },
  ],
  rounz: [{ type: 'text', content: '소개글...' }],
  muna: [{ type: 'text', content: '소개글...' }],
  klaybay: [{ type: 'text', content: '소개글...' }],
  stichy: [{ type: 'text', content: '소개글...' }],
  'miral-payment': [{ type: 'text', content: '소개글...' }],
};
