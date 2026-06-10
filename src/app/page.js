import TopStrip from "@/components/common/TopStrip";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";

import Hero from "@/components/landing/Hero";
import About from "@/components/landing/About";
import WhyChooseUs from "@/components/landing/WhyChooseUs";
import Statistics from "@/components/landing/Statistics";
import Standards from "@/components/landing/Standards";
import Subjects from "@/components/landing/Subjects";
import Features from "@/components/landing/Features";
import Performance from "@/components/landing/Performance";
import Fees from "@/components/landing/Fees";
import Testimonials from "@/components/landing/Testimonials";
import FAQ from "@/components/landing/FAQ";
import CTA from "@/components/landing/CTA";
import Gallery from "@/components/landing/Gallery";
import AchievementBanner from "@/components/landing/AchievementBanner";

export default function Home() {
  return (
    <main>
      <TopStrip />

      <Navbar />

      <Hero />

      <AchievementBanner />

      <About />

      <WhyChooseUs />

      <Statistics />

      <Standards />

      <Subjects />

      <Features />

      <Performance />

      <Fees />

      <Gallery />

      <Testimonials />

      <FAQ />

      <CTA />

      <Footer />
    </main>
  );
}