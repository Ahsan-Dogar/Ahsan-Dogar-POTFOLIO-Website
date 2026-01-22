
import { useEffect, RefObject } from 'react';
import { gsap } from 'gsap';

export const useMagnetic = (ref: RefObject<HTMLElement>) => {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const xTo = gsap.quickTo(el, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
    const yTo = gsap.quickTo(el, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

    const mouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { width, height, left, top } = el.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      
      // Only trigger if close to center
      const distance = Math.sqrt(x * x + y * y);
      const radius = 100;

      if (distance < radius) {
        xTo(x * 0.3);
        yTo(y * 0.3);
      } else {
        xTo(0);
        yTo(0);
      }
    };

    const mouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    window.addEventListener("mousemove", mouseMove);
    el.addEventListener("mouseleave", mouseLeave);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
      el.removeEventListener("mouseleave", mouseLeave);
    };
  }, [ref]);
};
