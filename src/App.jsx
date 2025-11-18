import { useState, useEffect } from "react";

import PortfolioLanding from './PortfolioLanding';
import PhotoSection from './PhotoSection';
import Work from './Work';
import FloatingBall from './FloatingBall';
import UnderConstructionOverlay from './UnderConstructionOverlay';
import SmoothScroll from './SmoothScroll';
import Contact from './Contact';

function App() {
  const [isMobile, setIsMobile] = useState(false);
  const isTouch =
    typeof window !== "undefined" &&
    ("ontouchstart" in window || navigator.maxTouchPoints > 0);

  useEffect(() => {
    const checkWidth = () => setIsMobile(window.innerWidth < 900);
    checkWidth(); // initial
    window.addEventListener("resize", checkWidth);

    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  return (
    <main className="App m-0 p-0 font-generalsans">

      {/* Always show overlay */}
      <UnderConstructionOverlay />

      {!isMobile && (
        <SmoothScroll>
          {!isTouch && (
            <FloatingBall offset={{ x: 32, y: 32 }} size={20} color="#fff" />
          )}

          <PortfolioLanding />
          <Work />
          <PhotoSection />
          <Contact />
        </SmoothScroll>
      )}
      
    </main>
  );
}

export default App;
