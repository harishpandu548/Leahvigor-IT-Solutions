// import Hero from "@/components/hero/Hero";
import Hero2 from "@/components/hero/Hero2";
import GrowthStatement from "@/components/sections/GrowthStatement";
import Services from "@/components/sections/Services";
import GrowthEngine from "@/components/sections/GrowthEngine";
import Solutions from "@/components/sections/Solutions";
import WhyLeahvigor from "@/components/sections/WhyLeahvigor";
import CoreCapabilities from "@/components/sections/CoreCapabilities";
import Work from "@/components/sections/Work";
import Testimonials from "@/components/sections/Testimonials";
import Process from "@/components/sections/Process";
import FinalCTA from "@/components/sections/FinalCTA";
import Impact from "@/components/sections/Impact";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/footer/Footer";
import Growth3DBackground from "@/components/sections/Growth3DBackground";

export default function HomePage() {
  return (
    <main id="main-content" style={{ overflowX: "clip" }}>
      <Growth3DBackground />
      {/* <Hero /> */}
      <Hero2 />
      <GrowthStatement />
      <Services />
      <WhyLeahvigor />
      <CoreCapabilities />
      <Work />
      <Solutions />
      <Testimonials />
      <Process />
      <GrowthEngine />
      <FinalCTA />
      <Impact />
      <Contact />
      <Footer />
    </main>
  );
}
