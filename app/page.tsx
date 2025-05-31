"use client";

import { useState } from "react";
import Navbar from "./_Components/navbar";
import { Herosection } from "./_Components/hero-section";
import { FeaturesSection } from "./_Components/features-section";
import { UseCasesSection } from "./_Components/use-cases-section";
import { TestimonialsSection } from "./_Components/testimonials-section";
import { CtaSection } from "./_Components/cta-section";
import { FooterSection } from "./_Components/footer-section";

export default function HomePage() {
  const [activeFeature, setActiveFeature] = useState(0);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background that spans the entire page */}
      <div className="fixed inset-0 space-bg z-0">
        <div className="stars absolute inset-0"></div>
        <div className="twinkling absolute inset-0"></div>
      </div>

      {/* Navigation */}
      <Navbar />

      <div className="relative z-10">
        {/* Hero Section */}
        <Herosection />

        {/* Features Section */}
        <FeaturesSection />

        {/* Use Cases Section */}
        <UseCasesSection />

        {/* Testimonials Section */}
        {/* <TestimonialsSection /> */}

        {/* CTA Section */}
        <CtaSection />

        {/* Footer */}
        <FooterSection />
      </div>
    </div>
  );
}
