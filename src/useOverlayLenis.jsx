import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import { useMotionValue } from "framer-motion";

export function useOverlayLenis() {
  const overlayRef = useRef(null);
  const scrollY = useMotionValue(0);

  useEffect(() => {
    if (!overlayRef.current) return;

    const wrapper = overlayRef.current;
    const content = wrapper.firstElementChild;

    if (!content) return;

    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      smoothTouch: true,
      wrapper,
      content,
    });

    lenis.on("scroll", ({ scroll }) => {
      scrollY.set(scroll);
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, [scrollY]);

  return { overlayRef, scrollY };
}
