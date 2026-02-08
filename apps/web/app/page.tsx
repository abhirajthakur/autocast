import Footer from "@/components/footer";
import Header from "@/components/header";
import FeaturesSection from "@/components/landing/features-section";
import HeroSection from "@/components/landing/hero-section";
import PipelineSection from "@/components/landing/pipeline-section";

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <PipelineSection />
        <FeaturesSection />
      </main>
      <Footer />
    </div>
  );
}
