import PortfolioLanding from './PortfolioLanding';
import PhotoSection from './PhotoSection';
import Work from './Work';
import FloatingBall from './FloatingBall';
import UnderConstructionOverlay from './UnderConstructionOverlay';
import SmoothScroll from './SmoothScroll';
import { motion } from 'framer-motion';
import Contact from './Contact';


function App() {
  const isTouch =
    typeof window !== "undefined" &&
    ("ontouchstart" in window || navigator.maxTouchPoints > 0);

  return (
    
    <main className="App m-0 p-0 font-generalsans">
    <UnderConstructionOverlay />
    <SmoothScroll>
      {!isTouch && (
        <FloatingBall offset={{ x: 32, y: 32 }} size={20} color="#fff" /> 
        )}
      <PortfolioLanding />
      <Work />
      <PhotoSection />
      <Contact />
    </SmoothScroll>
    </main>
    
  );
}

export default App;