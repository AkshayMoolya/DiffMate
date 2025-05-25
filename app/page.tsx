"use client";

import { useState } from "react";
import Navbar from "./_Components/navbar";
import { Herosection } from "./_Components/hero-section";
import { FeaturesSection } from "./_Components/features-section";
import { UseCasesSection } from "./_Components/use-cases-section";
import { CtaSection } from "./_Components/cta-section";
import { FooterSection } from "./_Components/footer-section";

export default function HomePage() {
  const [activeFeature, setActiveFeature] = useState(0);

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <Herosection />

      {/* Features Section */}
      <FeaturesSection />

      {/* Use Cases Section */}
      <UseCasesSection />

      {/* CTA Section */}
      <CtaSection />

      {/* Footer */}
      <FooterSection />
    </div>
  );
}
