import HeroSection from "@/sections/HeroSection";
import ServicesSection from "@/sections/ServicesSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <div id="services">
        <ServicesSection />
      </div>
    </>
  );
}
