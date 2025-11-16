import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export default function UnderConstructionOverlay() {
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    // Detect if screen width is medium or smaller
    const checkScreenSize = () => setShowOverlay(window.innerWidth < 900);

    checkScreenSize(); // check on mount
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    // Toggle scroll lock based on overlay visibility
    document.body.style.overflow = showOverlay ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [showOverlay]);

  if (!showOverlay) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="
        fixed w-full h-[100dvh] select-none cursor-none pointer-none: inset-0 z-[9999]
        bg-white flex items-center justify-center
        flex-col gap-4
      "
    >
      <FontAwesomeIcon icon={faXmark} className="text-xl"/>
      <h1 className="text-md sm:text-1xl font-semibold text-gray-800 tracking-widest text-center px-6">
        UNDER CONSTRUCTION
      </h1>
      <p className="text-sm sm:text-sm text-gray-600 text-center px-20">
        Sorry for the inconvenience. This portfolio is currently being optimized for smaller screens. Please extend your browser window to view the full experience.</p>
    </motion.div>
  );
}
