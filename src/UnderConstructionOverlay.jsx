import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export default function UnderConstructionOverlay() {
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => setShowOverlay(window.innerWidth < 900);

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    if (showOverlay) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
    }
  
    return () => {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
    };
  }, [showOverlay]);
  if (!showOverlay) return null;

  return (
    <div
      className="
      fixed z-[9999]
      w-[100vw]  h-svh min-h-svh
      bg-neutral-800
      select-none flex cursor-none 
      items-center justify-center
      flex-col gap-2
      no-safe-area"
    >
      <FontAwesomeIcon icon={faXmark} className="text-xl text-white"/>
      <h1 className="text-md sm:text-1xl font-semibold text-white tracking-widest text-center px-6">
        UNDER CONSTRUCTION
      </h1>
      <p className="text-sm sm:text-sm text-neutral-200 text-center px-20">
        Sorry! This portfolio is currently being optimized for mobile screens. Please extend your browser window to view the full experience.</p>
    </div>
  );
}
