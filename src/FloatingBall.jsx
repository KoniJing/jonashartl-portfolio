import React, { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * FloatingBall props:
 * - offset: { x: number, y: number }  // how far the ball is offset from the cursor
 * - size: number                       // diameter in px
 * - color: string                      // background color
 * - springConfig: { stiffness, damping } // optional spring config
 */
export default function FloatingBall({
  offset = { x: 24, y: 24 },
  size = 18,
  color = "#ffffff",
  springConfig = { stiffness: 300, damping: 28 },
}) {
  // motion values for x/y
  const mx = useMotionValue(window.innerWidth / 2);
  const my = useMotionValue(window.innerHeight / 2);

  // useSpring gives smoother animation
  const sx = useSpring(mx, springConfig);
  const sy = useSpring(my, springConfig);

  useEffect(() => {
    // pointermove covers mouse + touch (pointer events)
    function onPointerMove(e) {
      // e.clientX / e.clientY are relative to viewport
      const targetX = e.clientX + (offset.x ?? 0);
      const targetY = e.clientY + (offset.y ?? 0);

      mx.set(targetX);
      my.set(targetY);
    }

    // If pointer events are not supported, fallback to mousemove
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, [mx, my, offset.x, offset.y]);

  return (
    <motion.div
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        x: sx, // translate x
        y: sy, // translate y
        translateX: "-50%", // center the ball relative to x,y
        translateY: "-50%",
        pointerEvents: "none", // don't block clicks
        zIndex: 9999,
        mixBlendMode: "difference",
      }}
    >
      <div
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          background: color,
          transform: "translate3d(0,0,0)",
          
        }}
      />
    </motion.div>
  );
}
