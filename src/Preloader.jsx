// Preloader.jsx
import { useEffect, useState } from "react";
import { motion, useMotionValue, animate } from "framer-motion";

/**
 * Preloader
 * Props:
 *  - assets: string[] (URLs to preload; images recommended)
 *  - minDuration: number (ms) minimum visible time to avoid flicker, default 400
 *  - onFinish: () => void optional callback
 */
export default function Preloader({ assets = [], minDuration = 400, onFinish }) {
  const [loadedCount, setLoadedCount] = useState(0);
  const [startedAt] = useState(Date.now());
  const [hide, setHide] = useState(false);
  const total = Math.max(assets.length, 1); // avoid divide by zero

  // motion value for smooth numeric animation
  const progressMV = useMotionValue(0);
  const [display, setDisplay] = useState(0);

  // subscribe motion value -> update display (rounded)
  useEffect(() => {
    const unsubscribe = progressMV.on("change", (v) => {
      setDisplay(Math.round(v));
    });
    return unsubscribe;
  }, [progressMV]);

  // preload assets (simple image preload). fires load/error
  useEffect(() => {
    let cancelled = false;
    if (!assets || assets.length === 0) {
      // nothing to load → instantly "loaded"
      setLoadedCount(1);
      return;
    }

    assets.forEach((src) => {
      const img = new Image();
      img.onload = img.onerror = () => {
        if (cancelled) return;
        setLoadedCount((c) => c + 1);
      };
      img.src = src;
    });

    return () => {
      cancelled = true;
    };
  }, [assets]);

  // update motion value when loadedCount changes
  useEffect(() => {
    const target = Math.round((loadedCount / total) * 100);
    // animate motion value to new target
    const controls = animate(progressMV, target, { duration: 0.45, ease: [0.22, 0.8, 0.2, 1] });
    return controls.stop;
  }, [loadedCount, total, progressMV]);

  // when progress reaches 100, wait minDuration and then hide
  useEffect(() => {
    if (display < 100) return;

    const remaining = Math.max(0, minDuration - (Date.now() - startedAt));
    const t = setTimeout(() => {
      // trigger fade-out by setting hide -> used in motion.div animate
      setHide(true);
      // call onFinish after fade-out animation duration (400ms)
      const afterFade = setTimeout(() => {
        onFinish && onFinish();
      }, 400);
      return () => clearTimeout(afterFade);
    }, remaining);

    return () => clearTimeout(t);
  }, [display, minDuration, startedAt, onFinish]);

  // overlay variants: visible -> hidden (fades out and pointer-events disabled)
  const overlayVariants = {
    show: { opacity: 1, pointerEvents: "auto" },
    hide: { opacity: 0, pointerEvents: "none", transitionEnd: { display: "none" } },
  };

  return (
    <motion.div
      initial="show"
      animate={hide ? "hide" : "show"}
      variants={overlayVariants}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="fixed inset-0 bg-white z-[9999] flex items-center justify-center"
      aria-hidden={hide}
    >
      <div className="flex flex-col items-center gap-4">
        <div className="text-4xl md:text-6xl font-semibold text-black">
          {/* big numeric progress */}
          <span style={{ fontVariantNumeric: "tabular-nums" }}>{display}%</span>
        </div>
        <div className="text-sm text-gray-500">Loading</div>

        {/* optional thin progress bar */}
        <div className="w-[60vw] max-w-[600px] h-1 bg-black/10 rounded overflow-hidden mt-4">
          <motion.div
            style={{ width: `${display}%` }}
            initial={{ width: 0 }}
            animate={{ width: `${display}%` }}
            transition={{ duration: 0.45, ease: [0.22, 0.8, 0.2, 1] }}
            className="h-full bg-black origin-left"
          />
        </div>
      </div>
    </motion.div>
  );
}
