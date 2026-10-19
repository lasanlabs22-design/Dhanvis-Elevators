import { FloatingActions } from "@/components/layout/FloatingActions";
import { FloorIndicator } from "@/components/layout/FloorIndicator";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { Preloader } from "@/components/layout/Preloader";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { FAQ } from "@/components/sections/FAQ";
import { Gallery } from "@/components/sections/Gallery";
import { Hero } from "@/components/sections/Hero";
import { LiftSimulator } from "@/components/sections/LiftSimulator";
import { LiftTypes } from "@/components/sections/LiftTypes";
import { Process } from "@/components/sections/Process";
import { Safety } from "@/components/sections/Safety";
import { Services } from "@/components/sections/Services";
import { Showreel } from "@/components/sections/Showreel";

export default function Home() {
  return (
    <>
      <Preloader />
      <Navbar />
      <FloorIndicator />
      <FloatingActions />
      <main>
        <Hero />
        <About />
        <LiftTypes />
        <LiftSimulator />
        <Showreel />
        <Services />
        <Process />
        <Gallery />
        <Safety />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
