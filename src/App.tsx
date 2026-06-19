import Lenis from "lenis";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExperienceSection } from "./components/ExperienceSection";
import { Footer } from "./components/Footer";
import { PorscheHero } from "./components/PorscheHero";
import "./App.css";

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) return;

    const lenis = new Lenis({
      lerp: 0.08,
      wheelMultiplier: 0.85,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    ScrollTrigger.refresh();

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <PorscheHero />
      <ExperienceSection />
      <Footer />
    </>
  );
}

export default App;
