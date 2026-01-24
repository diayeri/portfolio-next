import { getGoogleAnalyticsId, isProduction } from './env';

/**
 * Google Analytics 초기화 함수
 * 실제 사용 시 gtag.js 스크립트를 index.html에 추가해야 합니다.
 */
export const initializeGoogleAnalytics = (): void => {
  const gaId = getGoogleAnalyticsId();
  
  if (!gaId || !isProduction()) {
    // GA ID가 없거나 개발 환경일 경우 초기화를 건너뜁니다.
    // console.log 메시지는 주석 처리하여 콘솔에 표시되지 않도록 합니다.
    // console.log('Google Analytics가 초기화되지 않았습니다. (개발 환경 또는 ID 없음)');
    return;
  }
  
  try {
    // 타입스크립트 에러를 방지하기 위한 window 확장
    const gtagWindow = window as unknown as {
      gtag: (...args: any[]) => void;
      dataLayer: any[];
    };
    
    // gtag가 존재하는지 확인
    if (typeof gtagWindow.gtag !== 'function') {
      console.error('Google Analytics 스크립트가 로드되지 않았습니다.');
      return;
    }
    
    // Google Analytics 초기화
    gtagWindow.gtag('config', gaId);
    // console.log('Google Analytics가 초기화되었습니다.');
  } catch (error) {
    console.error('Google Analytics 초기화 오류:', error);
  }
};

/**
 * Google Analytics 페이지 뷰 이벤트 전송
 * @param path - 페이지 경로
 */
export const trackPageView = (path: string): void => {
  const gaId = getGoogleAnalyticsId();
  
  if (!gaId || !isProduction()) return;
  
  try {
    const gtagWindow = window as unknown as { gtag: (...args: any[]) => void };
    
    if (typeof gtagWindow.gtag !== 'function') return;
    
    gtagWindow.gtag('event', 'page_view', {
      page_path: path,
    });
  } catch (error) {
    console.error('페이지 뷰 트래킹 오류:', error);
  }
};
