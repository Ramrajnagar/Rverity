import HeroSection from "@/components/landing/HeroSection";
import FeatureShowcase from "@/components/landing/FeatureShowcase";
import DeveloperSection from "@/components/landing/DeveloperSection";
import PricingPreview from "@/components/landing/PricingPreview";
import VisionSection from "@/components/landing/VisionSection";
import TrustSection from "@/components/landing/TrustSection";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full bg-black text-white">
      <div className="relative z-10 w-full">
        <HeroSection />
        <FeatureShowcase />
        <DeveloperSection />
        <VisionSection />
        <PricingPreview />
        <TrustSection />
        <Footer />
      </div>
    </main>
  );
}
