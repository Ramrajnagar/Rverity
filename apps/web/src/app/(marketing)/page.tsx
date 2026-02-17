import NeuralBackground from "@/components/ui/3d/NeuralBackground";
import HeroSection from "@/components/landing/HeroSection";
import FeatureShowcase from "@/components/landing/FeatureShowcase";
import WorkflowAnimated from "@/components/landing/WorkflowAnimated";
import IntegrationsGrid from "@/components/landing/IntegrationsGrid";
import DeveloperSection from "@/components/landing/DeveloperSection";
import PricingPreview from "@/components/landing/PricingPreview";
import VisionSection from "@/components/landing/VisionSection";
import TrustSection from "@/components/landing/TrustSection";
import Footer from "@/components/landing/Footer";

import { ScrollReveal } from "@/components/ui/ScrollReveal";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full bg-black text-white selection:bg-purple-500/30">
      <NeuralBackground />
      <div className="relative z-10 w-full">
        <HeroSection />

        <ScrollReveal width="100%">
          <FeatureShowcase />
        </ScrollReveal>

        <ScrollReveal width="100%">
          <WorkflowAnimated />
        </ScrollReveal>

        <ScrollReveal width="100%">
          <IntegrationsGrid />
        </ScrollReveal>

        <ScrollReveal width="100%">
          <DeveloperSection />
        </ScrollReveal>

        <VisionSection />

        <ScrollReveal width="100%">
          <PricingPreview />
        </ScrollReveal>

        <ScrollReveal width="100%">
          <TrustSection />
        </ScrollReveal>

        <Footer />
      </div>
    </main>
  );
}
