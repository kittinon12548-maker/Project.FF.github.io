import React from "react";
import HeroSlider from "@/components/HeroSlider";
import FeaturedProducts from "@/components/FeaturedProducts";
import ServiceHighlights from "@/components/ServiceHighlights";

export default function HomePage() {
  return (
    <div className="w-full">
      <HeroSlider />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-6 sm:pt-8 pb-10 sm:pb-14">
        <FeaturedProducts />
      </div>
      <ServiceHighlights />
    </div>
  );
}

