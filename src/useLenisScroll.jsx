import { useMotionValue } from "framer-motion";
import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

export function useLenisScroll() {
  const scrollY = useMotionValue(0);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.5,
      smoothWheel: true,
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

  return scrollY;
}