import { FloatingActions } from "@/components/layout/FloatingActions";
import { FloorIndicator } from "@/components/layout/FloorIndicator";
import { Navbar } from "@/components/layout/Navbar";
import { Preloader } from "@/components/layout/Preloader";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { LiftTypes } from "@/components/sections/LiftTypes";
import { LiftSimulator } from "@/components/sections/LiftSimulator";
import { Showreel } from "@/components/sections/Showreel";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { Gallery } from "@/components/sections/Gallery";

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
      </main>
    </>
  );
}
