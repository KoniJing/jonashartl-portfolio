import React from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';

const InfiniteBanner = () => {
const text = " — I SWEAR I AM A GOOD DESIGNER";
const repeatedText = `${text}   `.repeat(20); // Repeat text to make a long banner

// Animation: move text from right to left infinitely
const controls = useAnimation();

useEffect(() => {
controls.start({
x: ['0%', '-100%'],
transition: {
x: {
repeat: Infinity,
repeatType: 'loop',
duration: 16, // Adjust speed here
ease: 'linear'
}
}
});
}, [controls]);

return ( 

<div className="overflow-hidden w-full bg-black">
    <motion.div
        className="whitespace-nowrap text-white text-2xl font-medium py-4"
        animate={controls}
        >
        {repeatedText}
    </motion.div> 
</div>
);
};

export default InfiniteBanner;
