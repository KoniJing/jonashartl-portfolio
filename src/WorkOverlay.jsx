import React from "react";
import { motion, useTransform } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useOverlayLenis } from "./useOverlayLenis"; // import the hook

export default function WorkOverlay({ item, onClose }) {
  if (!item) return null;

  const { overlayRef, scrollY } = useOverlayLenis();

  // Example transform: move hero image up when scrolling overlay
  const y = useTransform(scrollY, [0, 500], [0, -200]);

  const renderNames = (str) =>
    str.split(",").map((name, i) => (
      <span key={i}>
        {name.trim()}
        <br />
      </span>
    ));

  return (
    <motion.div
      ref={overlayRef}
      className="fixed inset-0 z-50 bg-white overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: .5 }}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white text-2xl font-bold z-20 hover:scale-115 transition-transform"
      >
        <FontAwesomeIcon icon={faXmark}/>
      </button>

      {/* Hero Image Section */}
      <motion.div
        layoutId={`image-${item.id}`}
        className="relative w-full h-[50vh] overflow-hidden border-white"
      >
        <img
          src={item.url}
          alt={item.title}
          className="w-full h-full object-cover"
        />

        {/* Overlay gradient for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

        {/* Text overlay */}
        <div className="absolute w-[30%] inset-0 flex flex-col xl:items-start xl:justify-end mx-auto justify-center pb-[10vw] xl:pb-20 xl:ml-[5%] text-center">
          <img className="text-sm uppercase tracking-widest text-white mb-2"
            src={item.logo} 
            alt={`${item.title} logo`}
          />
        </div>
      </motion.div>

      
      <div className="max-w-[80%] mx-auto grid grid-cols-3 xl:max-w-[40%]  xl:text-lg xl:text-left text-center md:text-sm lg:text-md mt-[20%] xl:mt-[4%] xl:ml-[5%] gap-x-8">
            <div>
              <motion.p className="text-gray-700"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: .5, ease: "easeOut", delay: .6 }}>
                <span className= "font-semibold uppercase">Direction</span><br />
                {renderNames(item.direction)}
              </motion.p>
            </div>
            <div>
              <motion.p className="text-gray-700"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: .5, ease: "easeOut", delay: .8 }}>
                <span className="font-semibold uppercase">Edit</span><br />
                {renderNames(item.edit)}
              </motion.p>
            </div>
            <div>
              <motion.p className="text-gray-700"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: .5, ease: "easeOut", delay: 1 }}>
                <span className="font-semibold uppercase">Sound Design</span><br />
                {renderNames(item.soundDesign)}
              </motion.p>
            </div>   
      </div>

      {/* Video Embed Section */}
      <motion.div 
      className="flex flex-col xl:items-end items-center justify-center xl:mt-[-20%] mt-[-45%] xl:mr-[7%] z-10 relative"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: .5, ease: "easeOut", delay: .6 }}>
        <div className="w-[50%] max-w-5xl aspect-video bg-black rounded-lg overflow-hidden">
          <iframe
            src={item.video}
            title="Video"
            allow="autoplay; fullscreen"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        </div>
      </motion.div>

      <hr className="w-[40%] mx-auto border-t border-gray-300 mt-[25%] xl:hidden" />

      {/* About Section */}
      <section className="max-w-3xl mx-auto x-6 xl:py-24 xl:pt-55 pt-[8vw] pb-40 text-center">
        <h2 className="text-3xl font-semibold mb-6 tracking-widest">ABOUT</h2>
        <p className="text-gray-700 text-lg leading-relaxed">
          {item.about}
        </p>
      </section>

      {/* BTS Section */}
      <section className="max-w-7xl mx-auto px-4 pb-20">
        <h2 className="text-3xl font-semibold tracking-widest mb-4">BTS</h2>
        <div className="grid grid-cols-2 xl:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="w-full h-100 bg-gray-200 rounded-lg overflow-hidden"
            >
              <img src={item.bts[i]} alt="BTS" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  );
}
