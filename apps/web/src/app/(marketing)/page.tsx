import HeroSection from "@/components/landing/HeroSection";
import FeatureShowcase from "@/components/landing/FeatureShowcase";
import DataFlowAnimation from "@/components/landing/DataFlowAnimation";
import HowItWorks from "@/components/landing/HowItWorks";
import DeveloperSection from "@/components/landing/DeveloperSection";
import VisionSection from "@/components/landing/VisionSection";
import PricingPreview from "@/components/landing/PricingPreview";
import TrustSection from "@/components/landing/TrustSection";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full bg-black text-white">
      <div className="relative z-10 w-full">
        <HeroSection />
        <DataFlowAnimation />
        <FeatureShowcase />
        <HowItWorks />
        <DeveloperSection />
        <VisionSection />
        <PricingPreview />
        <TrustSection />
        <Footer />
      </div>
    </main>
  );
}
