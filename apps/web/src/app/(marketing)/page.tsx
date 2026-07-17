import HeroSection from "@/components/landing/HeroSection";
import TrustedBy from "@/components/landing/TrustedBy";
import DataFlowAnimation from "@/components/landing/DataFlowAnimation";
import FeatureShowcase from "@/components/landing/FeatureShowcase";
import HowItWorks from "@/components/landing/HowItWorks";
import DeveloperSection from "@/components/landing/DeveloperSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import VisionSection from "@/components/landing/VisionSection";
import PricingPreview from "@/components/landing/PricingPreview";
import TrustSection from "@/components/landing/TrustSection";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full bg-black text-white">
      <div className="relative z-10 w-full">
        <HeroSection />
        <div className="py-8 md:py-12">
          <TrustedBy />
        </div>
        <DataFlowAnimation />
        <FeatureShowcase />
        <HowItWorks />
        <DeveloperSection />
        <TestimonialsSection />
        <VisionSection />
        <PricingPreview />
        <TrustSection />
        <Footer />
      </div>
    </main>
  );
}
