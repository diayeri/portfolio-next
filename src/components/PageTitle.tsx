"use client";

import { useEffect } from "react";
import { getSiteTitle } from "../utils/env";

interface PageTitleProps {
  title?: string;
  suffix?: boolean;
}

/**
 * 페이지 제목을 동적으로 설정하는 컴포넌트
 * @param title - 페이지별 제목 (없으면 기본 사이트 제목만 표시)
 * @param suffix - 사이트 제목을 접미사로 추가할지 여부 (기본값: true)
 */
const PageTitle: React.FC<PageTitleProps> = ({ title, suffix = true }) => {
  const siteTitle = getSiteTitle();

  useEffect(() => {
    const pageTitle = title
      ? suffix
        ? `${title} | ${siteTitle}`
        : title
      : siteTitle;

    // 페이지 제목 설정
    document.title = pageTitle;
  }, [title, siteTitle, suffix]);

  // 이 컴포넌트는 UI를 렌더링하지 않고 문서 제목만 변경합니다
  return null;
};

export default PageTitle;
