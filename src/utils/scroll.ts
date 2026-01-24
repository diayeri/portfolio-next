/**
 * 부드러운 스크롤 기능을 위한 유틸리티 함수
 * @param elementId - 스크롤할 요소의 ID
 */
export const scrollToElement = (elementId: string): void => {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
};

/**
 * 스크롤 이벤트 감지 훅의 논리를 위한 유틸리티 함수
 * @param callback - 스크롤 이벤트 발생 시 실행할 콜백 함수
 * @param delay - 디바운스 딜레이(ms)
 */
export const debounce = <F extends (...args: any[]) => any>(
  func: F,
  waitFor: number
): ((...args: Parameters<F>) => void) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  
  return (...args: Parameters<F>): void => {
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    
    timeout = setTimeout(() => func(...args), waitFor);
  };
};