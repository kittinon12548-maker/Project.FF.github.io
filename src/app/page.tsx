import React from "react";
import HeroSlider from "@/components/HeroSlider";
import FeaturedProducts from "@/components/FeaturedProducts";
import LatestPosts from "@/components/LatestPosts";
import AboutBanner from "@/components/AboutBanner";

export default function HomePage() {
  return (
    <div className="w-full">
      <HeroSlider />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 sm:py-16 space-y-12">
        <FeaturedProducts />
        <LatestPosts />
        <AboutBanner />
      </div>
    </div>
  );
}
