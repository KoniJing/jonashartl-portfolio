import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLenisScroll } from "./useLenisScroll";

// Add your photo URLs here
const photos = [
  "/jonashartl-portfolio/Images/photoSection/_A737990-Bearbeitet.jpg",
  "/jonashartl-portfolio/Images/photoSection/_A738292.jpg",
  "/jonashartl-portfolio/Images/photoSection/_A739716.jpg",
  "/jonashartl-portfolio/Images/photoSection/Komp Gradient (0-00-01-13).png",
  "/jonashartl-portfolio/Images/photoSection/ShittyRig-1.jpg",
];

export default function PhotosSection() {
  const [trail, setTrail] = useState([]);
  const [isHovering, setIsHovering] = useState(false);
  const lastPos = useRef({ x: 0, y: 0 });
  const sectionRef = useRef(null);
  const scrollY = useLenisScroll();

  const handleMouseMove = (e) => {
    if (!isHovering) return;

    // Get section position relative to viewport
    const sectionRect = sectionRef.current.getBoundingClientRect();

    // Compute cursor position relative to the section
    const x = e.clientX - sectionRect.left;
    const y = e.clientY - sectionRect.top;

    const dx = x - lastPos.current.x;
    const dy = y - lastPos.current.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance > 200) {
      const id = Math.random();
      const newItem = {
        id,
        x,
        y,
        img: photos[Math.floor(Math.random() * photos.length)],
      };

      setTrail((prev) => [...prev, newItem]);
      lastPos.current = { x, y };

      // Remove photo after 3 seconds
      setTimeout(() => {
        setTrail((prev) => prev.filter((item) => item.id !== id));
      }, 3000);
    }
  };

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;

    const elementTop = sectionRef.current.offsetTop;
    const elementHeight = sectionRef.current.offsetHeight;
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
  }, [sectionRef, scrollY]);


  return (
    <section
      ref={sectionRef}
      className="relative flex items-center justify-center w-full h-screen bg-black overflow-hidden z-0"
      onMouseEnter={(e) => {
        setIsHovering(true);
        const rect = sectionRef.current.getBoundingClientRect();
        lastPos.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
      }}
      onMouseLeave={() => {
        setIsHovering(false);
        setTrail([]);
      }}
      onMouseMove={handleMouseMove}
    > 
    
      <motion.div 
      className="flex flex-col items-center z-10 mix-blend-difference"
      initial={{ opacity: 0, y: 50 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}>
        <h1 className="text-[10vw] font-bold text-white select-none leading-[1.2] text-center ">
          photos
          <br />
          <span className="text-[1vw] block text-center font-light">
            [move mouse to reveal]
          </span>
        </h1>
      </motion.div>

      <AnimatePresence>
        {trail.map((item) => (
          <motion.img
            key={item.id}
            src={item.img}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.2, opacity: { duration: 0.5 } }}
            className="absolute max-w-[400px] max-h-[400px] object-contain pointer-events-none z-3"
            style={{
              top: `${item.y}px`,
              left: `${item.x}px`,
              transform: "translate(-50%, -50%)",
            }}
          />
        ))}
      </AnimatePresence>
            
      <div className="absolute bg-white w-screen h-screen z-0 rounded-b-4xl"></div>
    </section>
  );
}
