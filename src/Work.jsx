import { motion, animate, useMotionValue } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import WorkOverlay from "./WorkOverlay";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export const items = [
  {
    id: 1,
    url: "/jonashartl-portfolio/Images/Remnants-19.jpg",
    title: "Remnants - a short film",
    logo: "/jonashartl-portfolio/Images/TitleCard-Remnants.svg",
    video: "https://player.vimeo.com/video/1117393192?h=a850f6bad3&autoplay=1&title=0&byline=0&portrait=0&muted=1",
    role:"13min | Direction | Editing",
    description:"A short film about friendship, betrayal and violence told through abstract visual storytelling.",
    about: "“Remnants” follows two childhood friends whose shared dream of escape binds them—and ultimately separates them. Tom grows up sheltered, while Max hides the violence at home and one night runs away with their saved money. Years later, Tom is stuck in the quiet stagnation of his rural life until a sudden assault and a rediscovered yellow envelope—symbol of their past—pull him back into memory and set him on his own path forward. A film about friendship, loss, and the moment when past and present collide.",
    direction: "Jonas Schön,Jonas Hartl",
    edit: "Jonas Schön,Christoph Welser,Jonas Hartl",
    soundDesign: "Jonas Schön",
    bts: 
    [
      "/jonashartl-portfolio/Images/RemnantsBTS/Remnants_Extra-1.jpg",
       "/jonashartl-portfolio/Images/RemnantsBTS/Remnants-53.jpg", 
       "/jonashartl-portfolio/Images/RemnantsBTS/Remnants-42.jpg", 
       "/jonashartl-portfolio/Images/RemnantsBTS/Remnants-14.jpg", 
       "/jonashartl-portfolio/Images/RemnantsBTS/Remnants-20.jpg", 
       "/jonashartl-portfolio/Images/RemnantsBTS/Remnants-35.jpg"
      ]
  },
  {
    id: 2,
    url: "/jonashartl-portfolio/Images/Spiked.jpg",
    title: "Spiked - interactive awareness campaign",
    logo: "/jonashartl-portfolio/Images/TitleCard-Spiked.svg",
    video: "https://player.vimeo.com/video/1071047759?h=aa95c88333&autoplay=1&title=0&byline=0&portrait=0&muted=1",
    role:"Interactive | Direction | UI-Design | VFX",
    description:"A interactive experience raising awareness about the dangers of spiked drinks in social settings.",
    about:"This interactive short film follows a young woman on a night out at a club with her friend, confronting the viewer with a series of instinct-driven decisions from her perspective. Filmed entirely in first-person POV, it immerses the audience directly into her experience as themes of youthful recklessness, friendship, boundary-crossing, and the danger of drink spiking unfold. Created as an awareness project in collaboration with Hamburg-based Stunning Studio, the film critically explores the risks surrounding K.O.-drops and aims to foster reflection and safer behavior within nightlife settings.",
    direction: "Jonas Schön,Jonas Hartl",
    edit: "Jonas Schön,Christoph Welser,Stunning Studio",
    soundDesign: "Jonas Schön",
    bts: 
    [
      "/jonashartl-portfolio/Images/SpikedBTS/SpikedBTS1.jpg",
      "/jonashartl-portfolio/Images/SpikedBTS/SpikedBTS2.jpg", 
      "/jonashartl-portfolio/Images/SpikedBTS/SpikedBTS3.jpg", 
      "/jonashartl-portfolio/Images/SpikedBTS/SpikedBTS4.jpg", 
      "/jonashartl-portfolio/Images/SpikedBTS/SpikedBTS5.jpg", 
      "/jonashartl-portfolio/Images/SpikedBTS/SpikedBTS6.jpg"
      ]
  },
  {
    id: 3,
    url: "/jonashartl-portfolio/Images/Kalkalpen.jpg",
    title: "/jonashartl-portfolio/ImageFilm Kalkalpen National Park",
    logo: "/jonashartl-portfolio/Images/TitleCard-Kalkalpen.svg",
    video: "",
    role:"Direction | Editing | Sound Design",
    description:"Coming Soon!",
    direction: "David Vierlinger,Jonas Hartl,Christoph Welser",
    edit: "David Vierlinger,Jonas Hartl,Christoph Welser",
    soundDesign: "David Vierlinger,Jonas Hartl,Christoph Welser",
    bts: []
  },
];

export default function Work() {
  const [index, setIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);
  const x = useMotionValue(0);

  const [activeItem, setActiveItem] = useState(null);

  useEffect(() => {
    if (!isDragging && containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth || 1;
      const targetX = -index * containerWidth;
      animate(x, targetX, {
        type: "spring",
        stiffness: 300,
        damping: 30,
      });
    }
  }, [index, x, isDragging]);

  return (
    <div className="w-screen">
      <motion.button className="fixed text-white text-2xl p-4 px-9 top-10 left-12 z-20 mix-blend-difference"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: .5, ease: "easeOut", delay: 1, }}
        onClick={() => { containerRef.current?.scrollIntoView({ behavior: "smooth" }); }}
        >
        WORK
      </motion.button>

      <section ref={ containerRef } className="relative w-screen h-screen bg-white overflow-hidden flex flex-col items-center justify-center select-none">
        <span className="absolute top-[-5.5vh] right-[-20vw] text-[35vw] font-medium leading-none text-black origin-center rotate-180">
          Work
        </span>

        <span className="absolute bottom-[-5.5vh] left-[-20vw] text-[35vw] font-medium leading-none text-black">
          Work
        </span>

        <div className="w-full lg:p-[10vw] sm:p-4 p-2 flex items-center justify-center gap-6">
          {/* Left Button */}
          <motion.button
            disabled={index === 0}
            onClick={() => setIndex((i) => Math.max(0, i - 1))}
            className={`flex items-center justify-center transition-transform z-10
              ${
                index === 0
                  ? "opacity-40 cursor-not-allowed"
                  : "hover:scale-110 hover:opacity-100 opacity-80"
              }`}
          >
            <svg
              className="w-10 h-10"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </motion.button>

          {/* Slider */}
          <div className="relative overflow-hidden rounded-lg w-[90%]">
            <motion.div
              className="flex"
              drag="x"
              dragElastic={0.2}
              dragMomentum={false}
              onDragStart={() => setIsDragging(true)}
              onDragEnd={(e, info) => {
                setIsDragging(false);
                const containerWidth = containerRef.current?.offsetWidth || 1;
                const offset = info.offset.x;
                const velocity = info.velocity.x;
                let newIndex = index;
                if (Math.abs(velocity) > 500) {
                  newIndex = velocity > 0 ? index - 1 : index + 1;
                } else if (Math.abs(offset) > containerWidth * 0.3) {
                  newIndex = offset > 0 ? index - 1 : index + 1;
                }
                newIndex = Math.max(0, Math.min(items.length - 1, newIndex));
                setIndex(newIndex);
              }}
              style={{ x }}
            >
             {items.map((item) => (
          <div
            key={item.id}
            className="relative shrink-0 w-full h-[80vh] overflow-hidden rounded-lg"
          >
            {/* Background Image */}
            <motion.img
              src={item.url}
              alt={item.title}
              className="w-full h-full object-cover rounded-lg select-none pointer-events-none"
              draggable={false}
              layoutId={`image-${item.id}`}
              onClick={() => setActiveItem(item)} // opens overlay
            />

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/30 rounded-lg"></div>

            {/* Centered Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-end text-center px-6 bottom-[8vh]">
              <img
                src={item.logo}
                alt={`${item.title} logo`}
                className="w-full max-w-lg h-30 object-contain mb-4"
              />

              <p className="text-md font-semibold text-white mb-2">
                {item.role}
              </p>

              <p className="max-w-sm text-sm md:text-base font-medium text-gray-200 mb-6 leading-5">
                {item.description}
              </p>

              {item.video !== "" && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveItem(item)}
                className="px-6 py-2 bg-white text-black rounded-full font-semibold hover:bg-gray-200 transition-colors"
              >
                View
              </motion.button>
              )}
            </div>
          </div>
        ))}

            </motion.div>

            {/* Dots */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2">
              {items.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === index ? "w-8 bg-white" : "w-2 bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Right Button */}
          <motion.button
            disabled={index === items.length - 1}
            onClick={() =>
              setIndex((i) => Math.min(items.length - 1, i + 1))
            }
            className={`w-12 h-12 flex items-center justify-center transition-transform z-10
              ${
                index === items.length - 1
                  ? "opacity-40 cursor-not-allowed"
                  : "hover:scale-110 hover:opacity-100 opacity-80"
              }`}
          >
            <svg
              className="w-10 h-10"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </motion.button>
        </div>
      </section>
      <AnimatePresence>
        {activeItem && (
          <WorkOverlay
            item={activeItem}
            onClose={() => setActiveItem(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
