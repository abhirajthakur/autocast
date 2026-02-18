import Footer from "@/components/footer";
import Header from "@/components/header";
import HeroSection from "@/components/landing/hero-section";
import PipelineSection from "@/components/landing/pipeline-section";

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <PipelineSection />
      </main>
      <Footer />
    </div>
  );
}
