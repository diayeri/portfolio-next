/**
 * 환경 변수에 접근하기 위한 유틸리티 함수들
 */

/**
 * 환경 변수를 안전하게 가져오는 함수
 * @param key - 환경 변수 키
 * @param defaultValue - 환경 변수가 없을 경우 기본값
 * @returns 환경 변수 값 또는 기본값
 */
export const getEnv = (key: string, defaultValue = ""): string => {
  return process.env[key] || defaultValue;
};

/**
 * 사이트 제목 가져오기
 */
export const getSiteTitle = (): string => {
  return getEnv("VITE_APP_SITE_TITLE", "UI Dev Portfolio - DY");
};

/**
 * Google Analytics ID 가져오기
 */
export const getGoogleAnalyticsId = (): string => {
  return getEnv("VITE_APP_GA_ID", "");
};

/**
 * 개발 환경인지 확인
 */
export const isDevelopment = (): boolean => {
  return process.env.DEV === "true";
};

/**
 * 프로덕션 환경인지 확인
 */
export const isProduction = (): boolean => {
  return process.env.PROD === "true";
};
