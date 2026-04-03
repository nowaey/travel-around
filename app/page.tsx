import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import FormatGrid from "@/components/home/FormatGrid";
import HowItWorks from "@/components/home/HowItWorks";

export default function HomePage() {
  return (
    <main>
      <Header />
      <HeroSection />
      <FormatGrid />
      <HowItWorks />
      <Footer />
    </main>
  );
}
