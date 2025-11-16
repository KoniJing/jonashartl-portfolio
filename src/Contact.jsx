import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { X } from "lucide-react";
import { useScroll, useTransform } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import Lenis from "@studio-freight/lenis";

import InfiniteBanner from "./InfiniteBanner";
import { useLenisScroll } from "./useLenisScroll";

export default function Contact() {
    return (
    <section className="w-screen h-screen relative bg-black flex flex-col items-center justify-center leading-relaxed">
    
      <h1 className="text-white text-4xl font-bold">CONTACT ME</h1>
      <p className="text-white text-1xl uppercase">jonasha03@gmail.com</p>
      
    </section>
)}