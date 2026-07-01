'use client';
import { useEffect } from 'react';

// 스크롤 시 [data-reveal] 요소를 부드럽게 등장시킵니다.
// JS가 실행될 때만 <html>에 js-reveal 클래스를 붙여, JS 실패 시엔 콘텐츠가 항상 보이게 합니다.
export default function Reveal() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add('js-reveal');

    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    if (els.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}
