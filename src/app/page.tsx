import { FloatingActions } from "@/components/layout/FloatingActions";
import { FloorIndicator } from "@/components/layout/FloorIndicator";
import { Navbar } from "@/components/layout/Navbar";
import { Preloader } from "@/components/layout/Preloader";
import { Hero } from "@/components/sections/Hero";

export default function Home() {
  return (
    <>
      <Preloader />
      <Navbar />
      <FloorIndicator />
      <FloatingActions />
      <main>
        <Hero />
      </main>
    </>
  );
}
