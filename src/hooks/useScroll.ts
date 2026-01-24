import React, { useState, useEffect, useRef } from 'react';
import { debounce } from '@/utils/scroll';

/**
 * 현재 활성화된 섹션을 추적하는 커스텀 훅
 * @param sectionIds - 추적할 섹션 ID 배열
 * @param offset - 활성 섹션으로 간주할 옵셋 (픽셀)
 */
export const useActiveSection = (sectionIds: string[], offset = 100): string | null => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  
  useEffect(() => {
    const handleScroll = debounce(() => {
      const currentScrollPos = window.scrollY;
      
      // 스크롤 위치에 따라 활성 섹션 결정
      for (const sectionId of sectionIds) {
        const element = document.getElementById(sectionId);
        if (!element) continue;
        
        const sectionTop = element.offsetTop - offset;
        const sectionBottom = sectionTop + element.offsetHeight;
        
        if (currentScrollPos >= sectionTop && currentScrollPos < sectionBottom) {
          setActiveSection(sectionId);
          break;
        }
      }
    }, 100);
    
    // 초기 로딩 시 실행
    handleScroll();
    
    // 스크롤 이벤트 리스너 등록
    window.addEventListener('scroll', handleScroll);
    
    // 클린업 함수
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sectionIds, offset]);
  
  return activeSection;
};

/**
 * 요소가 화면에 나타났는지 감지하는 커스텀 훅
 * @param threshold - 화면에 나타난 것으로 간주할 요소의 비율 (0.0 - 1.0)
 */
export const useIntersectionObserver = (threshold = 0.2): [boolean, React.RefObject<HTMLDivElement | null>] => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: '0px',
        threshold,
      }
    );
    
    const currentElement = ref.current;
    
    if (currentElement) {
      observer.observe(currentElement);
    }
    
    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [ref, threshold]);
  
  return [isVisible, ref];
};

export default {
  useActiveSection,
  useIntersectionObserver,
};
