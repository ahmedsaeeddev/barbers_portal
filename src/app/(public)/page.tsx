import type { Metadata } from "next";
import HeroSection from "@/components/home/hero-section";
import FeaturedShops from "@/components/home/featured-shops";
import PopularServices from "@/components/home/popular-services";
import HowItWorks from "@/components/home/how-it-works";
import WhyGoDigital from "@/components/home/why-go-digital";
import Testimonials from "@/components/home/testimonials";
import StatsSection from "@/components/home/stats-section";
import FAQSection from "@/components/home/faq-section";
import CTASection from "@/components/home/cta-section";

export const metadata: Metadata = {
  title: "Nayi Bhaee (بھئی نائی) — Bring Your Barber Shop Online",
  description: "Pakistan's first digital barber platform. Create your shop profile, list services, receive reviews, and grow your barbering business online.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedShops />
      <PopularServices />
      <HowItWorks />
      <WhyGoDigital />
      <StatsSection />
      <Testimonials />
      <FAQSection />
      <CTASection />
    </>
  );
}
