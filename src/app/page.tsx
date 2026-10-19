import { FloatingActions } from "@/components/layout/FloatingActions";
import { FloorIndicator } from "@/components/layout/FloorIndicator";
import { Navbar } from "@/components/layout/Navbar";
import { Preloader } from "@/components/layout/Preloader";

export default function Home() {
  return (
    <>
      <Preloader />
      <Navbar />
      <FloorIndicator />
      <FloatingActions />
      <main className="min-h-svh bg-navy-950" />
    </>
  );
}
