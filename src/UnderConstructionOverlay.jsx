import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export default function UnderConstructionOverlay() {

  return (
    <div
      className="
      fixed z-[9999]
      w-[100vw]  h-svh min-h-svh
      bg-white
      select-none flex cursor-none 
      items-center justify-center
      flex-col gap-2
      no-safe-area"
    >
      <FontAwesomeIcon icon={faXmark} className="text-xl"/>
      <h1 className="text-md sm:text-1xl font-semibold text-black tracking-widest text-center px-6">
        UNDER CONSTRUCTION
      </h1>
      <p className="text-sm sm:text-sm text-neutral-800 text-center px-20">
        Sorry! This portfolio is currently being optimized for mobile screens. Please extend your browser window to view the full experience.</p>
    </div>
  );
}
