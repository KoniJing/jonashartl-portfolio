import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { X } from "lucide-react";
import { useScroll, useTransform } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import Lenis from "@studio-freight/lenis";

import InfiniteBanner from "./InfiniteBanner";
import { useLenisScroll } from "./useLenisScroll";

export default function PortfolioLanding() {
  const scrollY = useLenisScroll();

  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const elementTop = ref.current.offsetTop;
    const elementHeight = ref.current.offsetHeight;
    const viewportHeight = window.innerHeight;

    const checkVisibility = () => {
      const scroll = scrollY.get(); // current scroll position from Lenis
      if (scroll + viewportHeight > elementTop + 50) { // 50px buffer
        setIsVisible(true);
      }
    };

    checkVisibility(); // check immediately in case already in view
    const unsubscribe = scrollY.on("change", checkVisibility);

    return () => unsubscribe();
  }, [ref, scrollY]);

  const y = useTransform(scrollY, [0, 1000], ["0%", "85%"]);
  const scale = useTransform(scrollY, [0, 1000], [1, 0.48]);
  const borderRadius = useTransform(scrollY, (v) => (v > 0 ? "20px" : "0px"));
  

  return (
    <div className="w-screen">
    
    {/* Section 1 */}
    <section className="w-screen h-screen relative bg-white">


      <motion.img
        src="./Images/HSP-1.jpg"
        className="absolute top-0 left-0 w-full h-full object-cover z-0 grayscale transform-gpu will-change-transform"
        style={{ y, scale, borderRadius }}
      ></motion.img>

      
      <div className="absolute bottom-0 left-0 w-full z-10">
      <InfiniteBanner/>
      </div>

      

      {/* Right button */}
      <motion.button 
        className="fixed text-white text-1xl p-4 px-9 font-semibold bg-black rounded-full top-10 right-10 z-20"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: .5, ease: "easeOut", delay: .8 }}
        onClick={() => {
          window.location = 'mailto:jonasha03@gmail.com'}}
        >
        Contact me
      </motion.button>

      
      <div className="absolute w-full h-screen flex flex-col items-center z-10 justify-end mix-blend-difference overflow-hidden">
      <motion.h1 
        className="text-[15vw] font-generalsans font-bold text-white leading-65"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: .8, ease: "easeOut" }}>
        HI&nbsp;I&nbsp;AM&nbsp;JONAS 
      </motion.h1>

    <p className="text-[1.5vw] text-white flex justify-between w-full px-[3.5vw] mb-30">
      
      <motion.span
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: .8, ease: "easeOut", delay: 0.2 }}
      >SCROLL</motion.span>

      <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: .8, ease: "easeOut", delay: 0.4 }}
      ><FontAwesomeIcon icon={faChevronDown} beat/></motion.div>

      <motion.span
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: .8, ease: "easeOut", delay: 0.6 }}
      >DOWN</motion.span>

    </p>
</div>
      
      
    </section>
    
    {/* Section 2 */}
    <section ref={ref} className="w-screen bg-white">

      <motion.div 
        className="h-full text-center block pt-[65vh] z-10 overflow-hidden "
        initial={{ opacity: 0, y: 50 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}>
        <p className="[font-size:clamp(1.3rem,1.3vw,10rem)]">ABOUT ME</p>
        <h1 className="[font-size:clamp(3.2rem,4vw,10rem)] leading-tight font-bold text-black pb-50">
        Visual Artist based in <br></br>Austria — Crafting bold, <br></br> expressive designs.
        </h1>
      </motion.div>
    </section>
    </div>
    );
}

